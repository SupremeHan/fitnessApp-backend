import { Injectable, NestMiddleware, HttpException, HttpStatus } from "@nestjs/common";
import { AdminService } from "src/services/admin.service";
import { NextFunction, Request, Response  } from "express";
import { JwtDataAdminDto } from "src/dtos/admin/jwt.data.admin.dto";
import { jwtSecretKey } from "config/jwt.secret";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly adminService: AdminService) {}

    async use(req: Request, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }

        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if(tokenParts.length !== 2) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const tokenString = tokenParts[1];

        const jwtData: JwtDataAdminDto = jwt.verify(tokenString, jwtSecretKey);
        if(!jwtData) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        const admin = await this.adminService.getById(jwtData.adminId);
        if(!admin) {
            throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
        }

        const trenutniTimestamp = new Date().getTime() / 1000;
        if(trenutniTimestamp >= jwtData.exp) {
            throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
        }

        next();
    }
}