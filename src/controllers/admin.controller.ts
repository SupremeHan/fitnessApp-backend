import { Controller, Get, Param, Put, Body } from "@nestjs/common";
import { AdminService } from "src/services/admin.service";
import { Admin } from "entities/Admin";
import { ApiResponse } from "src/misc/api.response";
import { AddAdminDto } from "src/dtos/admin/add.admin.dto";

@Controller('api/admin')
export class AdminController {
    constructor(
        private adminService: AdminService
    ) {}

    @Get()
    getAll(): Promise<Admin[]> {
        return this.adminService.getAll();
    }

    @Get(':id')
    getById(@Param('id') adminId: number): Promise<Admin | ApiResponse> {
        return new Promise(async (resolve) => {
            let admin = await this.adminService.getById(adminId);

            if(admin === undefined) {
                resolve(new ApiResponse('error',-1002));
            }
            resolve(admin);
        })   
    }

    @Put()
    add(@Body() data: AddAdminDto): Promise<Admin | ApiResponse> {
        return this.adminService.add(data);
    }
}