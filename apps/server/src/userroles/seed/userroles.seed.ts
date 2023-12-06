import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserService } from '@/user/user.service';
import { User } from '@/user/entities/user.entity';

import getSeedUser from '@config/seeduser.config';

import { RolesService } from '@/roles/roles.service';

import { RoleEnum } from '@common/constants/role.enum';

/**
 * Service for seeding initial user roles in the database.
 *
 * @class
 */
@Injectable()
export class UserroleSeed {
  /**
   * Constructor for the `UserroleSeed` service.
   *
   * @constructor
   * @param {UserService} userService - The user service.
   * @param {RolesService} roleService - The roles service.
   * @param {ConfigService} configService - The configuration service.
   */
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RolesService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Seed initial user roles in the database if no users exist.
   *
   * @async
   * @function
   * @returns {Promise<void>} - A promise that resolves when the seeding is complete.
   */
  async seed(): Promise<void> {
    // Check if user already exist in the database
    const existingUsers = await this.userService.findAll();

    if (existingUsers.length === 0) {
      // Users do not exist, seed some initial data
      const username = getSeedUser(this.configService).username;
      console.log(username);

      const user = await this.userService.findByUserName(username);

      if (!user) {
        const newUser = new User();
        newUser.createdOn = new Date().toDateString();
        newUser.lastLoginTime = new Date().toDateString();
        newUser.username = username;

        const role = await this.roleService.findByRoleName(
          RoleEnum.Admin.toString(),
        );

        if (role) {
          newUser.roles = [role];
          this.userService.saveUser(newUser);
        }
      }
      // Add more users as needed
    }
  }
}
