import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { User } from 'entities/User';
import { UserService } from 'src/services/user.service';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import { ApiResponse } from 'src/misc/api.response';
import { async } from 'rxjs';
import { resolve } from 'path';

@Controller('api/user')
@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      field: 'userId',
      type: 'number',
      primary: true,
    },
  },
})
export class UserController {
  constructor(public service: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') userId: number): Promise<User | ApiResponse> {
    return new Promise(async resolve => {
      let user = await this.service.getById(userId);
      if (user == undefined) {
        resolve(new ApiResponse('error', -5002));
      }
      resolve(user);
    });
  }
}
