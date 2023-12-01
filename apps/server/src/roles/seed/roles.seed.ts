import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesService } from '../roles.service';
import { RoleEnum } from './role.enum';

@Injectable()
export class RoleSeed {
  constructor(private readonly roleService: RolesService) {}

  async seed() {
    // Check if roles already exist in the database
    const existingRoles = await this.roleService.findAll();
    if (existingRoles.length === 0) {
      // Roles do not exist, seed some initial data
      await this.roleService.create(
        new CreateRoleDto(RoleEnum.Admin.toString()),
      );
      await this.roleService.create(
        new CreateRoleDto(RoleEnum.User.toString()),
      );
      await this.roleService.create(
        new CreateRoleDto(RoleEnum.Reviewer.toString()),
      );
      // Add more roles as needed
    }
  }
}
