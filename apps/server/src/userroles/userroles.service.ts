import { UserService } from 'src/user/user.service';

import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';

import { HttpStatus, Injectable } from '@nestjs/common';

import { UpdateUserroleDto } from './dto/update-userrole.dto';
import { AssignUserroleDto } from './dto/assign-userrole.dto';

import { ErrorMessage } from 'src/common/errors/error.message';
import { RestException } from 'src/common/exceptions/rest.exception';
import { ErrorDescription } from 'src/common/errors/constants/description.error';

@Injectable()
export class UserrolesService {
  constructor(
    private userService: UserService,
    private roleService: RolesService,
  ) {}

  assignUserRole = async (assignUserroleDto: AssignUserroleDto) => {
    const user = await this.userService.findOne(assignUserroleDto.userId);
    if (!user) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatus.NOT_ACCEPTABLE.toLocaleString(),
          ErrorDescription.NO_ASSOCIATED_USER_FOUND,
        ),
      );
    }

    const roleList: Role[] = [];
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
    if (roleList.length != assignUserroleDto.rolesId.length) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.CONFLICT,
          HttpStatus.CONFLICT.toString(),
          ErrorDescription.INVALID_ROLE,
        ),
      );
    }
    user.roles = roleList;
    this.userService.saveUser(user);

    return 'This action assigns user with roles';
  };

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
