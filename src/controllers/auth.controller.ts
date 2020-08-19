import { Controller, Post, Body, Req } from "@nestjs/common";
import { AdminService } from "src/services/admin.service";
import { LoginAdminDto } from "src/dtos/admin/login.admin.dto";
import { ApiResponse } from "src/misc/api.response";
import * as crypto from "crypto";
import { JwtDataAdminDto } from "src/dtos/admin/jwt.data.admin.dto";
import { jwtSecretKey } from "config/jwt.secret";
import * as jwt from 'jsonwebtoken';
import { LoginInfoAdminDto } from "src/dtos/admin/login.info.admin.dto";

@Controller('auth')
export class AuthController {
    constructor(public adminService: AdminService) {}

    @Post('login') // http://localhost:3000/auth/login/
    async doLogin(@Body() data: LoginAdminDto): Promise<ApiResponse | LoginInfoAdminDto> {
        const admin = await this.adminService.getByUsername(data.username);

        if(!admin) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if(admin.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }

        const jwtData = new JwtDataAdminDto();
        jwtData.adminId = admin.adminId;
        jwtData.username = admin.username;
        jwtData.exp = this.getDatePlus(60 * 30);

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecretKey);

        const responseObj = new LoginInfoAdminDto(
            admin.adminId,
            admin.username,
            token
        );

        return new Promise(resolve => resolve(responseObj));
    }

    private getDatePlus(numberOfSeconds: number): number {
        return new Date().getTime() / 1000 + numberOfSeconds;
    }

}