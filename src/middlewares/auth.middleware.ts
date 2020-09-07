import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from 'src/services/admin.service';
import { NextFunction, Request, Response } from 'express';
import { JwtDataDto } from 'src/dtos/auth/jwt.data.dto';
import { jwtSecretKey } from 'config/jwt.secret';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    public adminService: AdminService,
    public userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }

    const token = req.headers.authorization;

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2) {
      throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
    }

    const tokenString = tokenParts[1];

    const jwtData: JwtDataDto = jwt.verify(tokenString, jwtSecretKey);
    if (!jwtData) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    if (jwtData.role === 'admin') {
      const admin = await this.adminService.getById(jwtData.id);
      if (!admin) {
        throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
      }
    } else if (jwtData.role === 'user') {
      const user = await this.userService.getById(jwtData.id);
      if (!user) {
        throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
      }
    }

    const trenutniTimestamp = new Date().getTime() / 1000;
    if (trenutniTimestamp >= jwtData.exp) {
      throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
