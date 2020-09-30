import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from 'src/services/admin.service';
import { Admin } from 'entities/Admin';
import { ApiResponse } from 'src/misc/api.response';
import { AddAdminDto } from 'src/dtos/admin/add.admin.dto';
import { AllowToRoles } from 'src/misc/allow.to.roles.descriptor';
import { RoleCheckerGurad } from 'src/misc/role.chacker.guard';

@Controller('api/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @UseGuards(RoleCheckerGurad)
  @AllowToRoles('admin')
  getAll(): Promise<Admin[]> {
    return this.adminService.getAll();
  }

  @Get(':id')
  @UseGuards(RoleCheckerGurad)
  @AllowToRoles('admin')
  getById(@Param('id') adminId: number): Promise<Admin | ApiResponse> {
    return new Promise(async resolve => {
      let admin = await this.adminService.getById(adminId);

      if (admin === undefined) {
        resolve(new ApiResponse('error', -1002));
      }
      resolve(admin);
    });
  }

  @Put()
  @UseGuards(RoleCheckerGurad)
  @AllowToRoles('admin')
  add(@Body() data: AddAdminDto): Promise<Admin | ApiResponse> {
    return this.adminService.add(data);
  }
}
