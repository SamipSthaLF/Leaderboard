import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AssignUserroleDto } from './dto/assign-userrole.dto';
import { UpdateUserroleDto } from './dto/update-userrole.dto';

@Injectable()
export class UserrolesService {
  constructor(
    private userService: UserService,
    private roleService: RolesService,
  ) {}
  async assignUserRole(assignUserroleDto: AssignUserroleDto) {
    const user = await this.userService.findOne(assignUserroleDto.userId);
    if (!user) {
      return 'No valid user is found!';
    }
    console.log(user);
    console.log(assignUserroleDto);
    var roleList: Role[] = [];
    //todo validate role id is present.
    await Promise.all(
      assignUserroleDto.rolesId.map(async (roleId) => {
        try {
          const role = await this.roleService.findOne(roleId);
          if (role) {
            roleList.push(role);
          } else {
            console.log(`Role with ID ${roleId} not found`);
          }
        } catch (error) {
          console.error(`Error while fetching role with ID ${roleId}:`, error);
        }
      }),
    );
    console.log('roleList' + roleList);
    user.roles = roleList;
    this.userService.saveUser(user);

    return 'This action assigns user with roles';
  }

  findAll() {
    return `This action returns all userroles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userrole`;
  }

  update(id: number, updateUserroleDto: UpdateUserroleDto) {
    return `This action updates a #${id} userrole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userrole`;
  }
}
