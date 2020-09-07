import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { User } from 'entities/User';
import { UserService } from 'src/services/user.service';
import { AddUserDto } from 'src/dtos/user/add.user.dto';

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
}
