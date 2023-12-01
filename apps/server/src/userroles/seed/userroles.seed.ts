import { Injectable } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from 'src/user/user.service';
import getSeedUser from 'src/config/seeduser.config';
import { ConfigService } from '@nestjs/config';
import { RoleEnum } from 'src/roles/seed/role.enum';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserroleSeed {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RolesService,
    private readonly configService: ConfigService,
  ) {}

  async seed() {
    // Check if user already exist in the database
    const exisitingUsers = await this.userService.findAll();
    if (exisitingUsers.length === 0) {
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
