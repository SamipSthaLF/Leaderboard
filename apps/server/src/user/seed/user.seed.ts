import { Injectable } from '@nestjs/common';

import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';

import { RoleEnum } from '@/common/constants/role.enum';

import { RoleEnum } from '@/common/constants/role.enum';

/**
 * Service for seeding initial users in the database.
 *
 * @class
 */
@Injectable()
export class UserSeed {
  /**
   * Constructor for the `UserSeed` service.
   *
   * @constructor
   * @param {UserService} userService - The user service.
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Seed initial users in the database if no users exist.
   *
   * @async
   * @function
   * @returns {Promise<void>} - A promise that resolves when the seeding is complete.
   */
  async seed(): Promise<void> {
    // Check if users already exist in the database
    const existingUsers = await this.userService.findAll();

    if (existingUsers.length === 0) {
      // Users do not exist, seed some initial data
      const user = await this.userService.create(
        new CreateUserDto('asminshrestha@lftechnology.com'),
      );
      user.roles = [RoleEnum.ADMIN, RoleEnum.USER];
      this.userService.saveUser(user);
      user.roles = [RoleEnum.ADMIN, RoleEnum.USER];
      this.userService.saveUser(user);
      // Add more users as needed
    }
  }
}
