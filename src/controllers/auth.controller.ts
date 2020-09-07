import { Controller, Post, Body, Req, Put } from '@nestjs/common';
import { AdminService } from 'src/services/admin.service';
import { LoginAdminDto } from 'src/dtos/admin/login.admin.dto';
import { ApiResponse } from 'src/misc/api.response';
import * as crypto from 'crypto';
import { JwtDataDto } from 'src/dtos/auth/jwt.data.dto';
import { jwtSecretKey } from 'config/jwt.secret';
import * as jwt from 'jsonwebtoken';
import { LoginInfoDto } from 'src/dtos/auth/login.info.dto';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import { UserService } from 'src/services/user.service';
import { LoginUserDto } from 'src/dtos/user/login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    public adminService: AdminService,
    public userService: UserService,
  ) {}

  @Post('/admin/login') // http://localhost:3000/auth/login/
  async doAdminLogin(
    @Body() data: LoginAdminDto,
  ): Promise<ApiResponse | LoginInfoDto> {
    const admin = await this.adminService.getByUsername(data.username);

    if (!admin) {
      return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
    }

    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toUpperCase();

    if (admin.passwordHash !== passwordHashString) {
      return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
    }

    const jwtData = new JwtDataDto();
    jwtData.role = 'admin';
    jwtData.id = admin.adminId;
    jwtData.identity = admin.username;
    jwtData.exp = this.getDatePlus(60 * 30);

    let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecretKey);

    const responseObj = new LoginInfoDto(admin.adminId, admin.username, token);

    return new Promise(resolve => resolve(responseObj));
  }

  private getDatePlus(numberOfSeconds: number): number {
    return new Date().getTime() / 1000 + numberOfSeconds;
  }

  @Put('/user/register')
  async userRegister(@Body() data: AddUserDto) {
    return this.userService.createUser(data);
  }

  @Post('/user/login') // http://localhost:3000/auth/login/
  async doUserLogin(
    @Body() data: LoginUserDto,
  ): Promise<ApiResponse | LoginInfoDto> {
    const user = await this.userService.getByEmail(data.email);

    if (!user) {
      return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
    }

    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toUpperCase();

    if (user.passwordHash !== passwordHashString) {
      return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
    }

    const jwtData = new JwtDataDto();
    jwtData.role = 'user';
    jwtData.id = user.userId;
    jwtData.identity = user.email;
    jwtData.exp = this.getDatePlus(60 * 30);

    let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecretKey);

    const responseObj = new LoginInfoDto(user.userId, user.email, token);

    return new Promise(resolve => resolve(responseObj));
  }
}
