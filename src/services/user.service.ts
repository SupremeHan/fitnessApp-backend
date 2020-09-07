import { Injectable } from '@nestjs/common';
import { User } from 'entities/User';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/misc/api.response';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import * as crypto from 'crypto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {
    super(user);
  }

  getAll(): Promise<User[]> {
    return this.user.find();
  }

  getById(id: number): Promise<User> {
    return this.user.findOne(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.user.findOne({
      email: email,
    });

    if (user) {
      return user;
    }

    return null;
  }

  async createUser(data: AddUserDto): Promise<User | ApiResponse> {
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toUpperCase();

    let newUser: User = new User();
    newUser.name = data.name;
    newUser.lastname = data.lastName;
    newUser.age = data.age;
    newUser.height = data.height;
    newUser.weight = data.weight;
    newUser.email = data.email;
    newUser.passwordHash = passwordHashString;

    return new Promise(resolve => {
      this.user
        .save(newUser)
        .then(data => resolve(data))
        .catch(error => {
          const response: ApiResponse = new ApiResponse('error', -2001);
          resolve(response);
        });
    });
  }
}
