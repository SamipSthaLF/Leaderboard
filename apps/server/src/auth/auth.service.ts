import { Request } from 'express';

import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { User } from 'src/user/entities/user.entity';

import { generateAccessToken } from './util/jwt.util';

import { ErrorMessage } from 'src/common/errors/error.message';
import { RestException } from 'src/common/exceptions/rest.exception';
import { ErrorDescription } from 'src/common/errors/constants/description.error';
import { RolesService } from 'src/roles/roles.service';
import { RoleEnum } from 'src/roles/seed/role.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly roleService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  requestAuthentication = async (req: Request) => {
    if (req.headers['x-api-key'] == process.env.STATIC_API_TOKEN) {
      return 'Authentication bypass from vyaguta'; // todo feature if called from vyaguta with authentication bypass
    }
    // Check if an authorized user exists in the request
    if (!req.user) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED.toLocaleString(),
          ErrorDescription.UNAUTHORIZED_USER,
        ),
      );
    }
  };

  createOrUpdateUser = async (user: any) => {
    if (!user) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatus.NOT_ACCEPTABLE.toLocaleString(),
          ErrorDescription.NO_ASSOCIATED_USER_FOUND,
        ),
      );
    }
    const existingUser = await this.userRepository.findOne({
      where: { username: user.email },
    });

    let newUser: User;

    if (!existingUser) {
      newUser = this.userRepository.create({
        username: user.email,
        createdOn: new Date().toDateString(),
      });
      const defaultRole = await this.roleService.findByRoleName(RoleEnum.User);
      if (defaultRole) {
        newUser.roles = [defaultRole];
      }
    } else {
      newUser = existingUser;
    }

    newUser.lastLoginTime = new Date().toDateString();

    const savedUser = await this.userRepository.save(newUser);

    const userWithRoles = await this.userRepository.findOne({
      where: { id: savedUser.id },
      relations: ['roles'],
    });

    if (!userWithRoles) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatus.NOT_ACCEPTABLE.toLocaleString(),
          ErrorDescription.NO_ASSOCIATED_USER_FOUND,
        ),
      );
    }
    // Return user information and a success message

    return {
      user: savedUser,
      message: 'Successful Login from Google Oauth',
      accessToken: generateAccessToken(this.jwtService, userWithRoles),
    };
  };
}
