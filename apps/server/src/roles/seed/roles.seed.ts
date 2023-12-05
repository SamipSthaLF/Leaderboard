import { Injectable } from '@nestjs/common';

import { RoleEnum } from '@common/constants/role.enum';

import { RolesService } from '@/roles/roles.service';
import { CreateRoleDto } from '@/roles/dto/create-role.dto';

/**
 * Service for seeding initial roles in the database.
 *
 * @class
 */
@Injectable()
export class RoleSeed {
  /**
   * Constructor for the `RoleSeed` service.
   *
   * @constructor
   * @param {RolesService} roleService - The roles service.
   */
  constructor(private readonly roleService: RolesService) {}

  /**
   * Seed initial roles in the database if no roles exist.
   *
   * @async
   * @function
   * @returns {Promise<void>} - A promise that resolves when the seeding is complete.
   */
  async seed(): Promise<void> {
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
