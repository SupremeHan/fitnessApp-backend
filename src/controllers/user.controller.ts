import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { User } from 'entities/User';
import { UserService } from 'src/services/user.service';
import { ApiResponse } from 'src/misc/api.response';

@Controller('api/user')
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
