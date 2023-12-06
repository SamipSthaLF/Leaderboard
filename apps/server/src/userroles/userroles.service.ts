import { HttpStatus, Injectable } from '@nestjs/common';

import { UserService } from '@/user/user.service';
import { RolesService } from '@/roles/roles.service';

import { Role } from '@/roles/entities/role.entity';

import { AssignUserroleDto } from '@/userroles/dto/assign-userrole.dto';

import { ErrorMessage } from '@common/errors/error.message';
import { RestException } from '@common/exceptions/rest.exception';
import { ErrorDescription } from '@common/errors/constants/description.error';

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
}
