import { Injectable } from "@nestjs/common";
import { Admin } from "entities/Admin";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddAdminDto } from "src/dtos/admin/add.admin.dto";
import { ApiResponse } from "src/misc/api.response";
import * as crypto from "crypto";

@Injectable()
export class AdminService {
    constructor( @InjectRepository(Admin)
    private readonly admin: Repository<Admin>
) {}

getAll(): Promise<Admin[]> {
    return this.admin.find();
}

getById(id: number): Promise<Admin> {
    return this.admin.findOne(id);
}

async getByUsername(username: string): Promise<Admin| null> {
    const admin = await this.admin.findOne({
        username: username
    });
    if(admin) {
        return admin;
    }

    return null;
}

add(data: AddAdminDto): Promise<Admin | ApiResponse> {
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toUpperCase();

    let newAdmin: Admin = new Admin();
    newAdmin.username = data.username;
    newAdmin.passwordHash = passwordHashString;

    return new Promise((resolve) => {
        this.admin.save(newAdmin)
        .then(data => resolve(data))
        .catch(error => {
            const response: ApiResponse = new ApiResponse("error", -1001);
            resolve(response);
        });
    })
}
}