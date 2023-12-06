import { Request } from 'express';

import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { RoleEnum } from '@/common/constants/role.enum';
import { ErrorMessage } from '@common/errors/error.message';
import { RestException } from '@common/exceptions/rest.exception';
import { ErrorDescription } from '@common/errors/constants/description.error';

import { User } from '@/user/entities/user.entity';

import { RolesService } from '@/roles/roles.service';

import { generateAccessToken } from '@/auth/util/jwt.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly roleService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Perform request authentication.
   *
   * @param {Request} req - Express request object.
   * @returns {Promise<string | { message: string, user: User }>} Authentication result.
   */
  requestAuthentication = async (req: Request) => {
    // Check if the request has a valid API key for authentication bypass
    if (req.headers['x-api-key'] === process.env.STATIC_API_TOKEN) {
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

  /**
   * Service method to create or update a user based on the provided information.
   * @async
   * @function
   * @name createOrUpdateUser
   * @param {User} user - The user information.
   * @returns {Promise<{ user: User, message: string, accessToken: string }>} - An object containing user information, a success message, and an access token.
   * @throws {RestException} - Throws a `RestException` if no associated user is found or an error occurs during the process.
   */
  createOrUpdateUser = async (
    user: UserDto,
  ): Promise<{ user: User; message: string; accessToken: string }> => {
    if (!user || !user.email) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatus.NOT_ACCEPTABLE.toLocaleString(),
          ErrorDescription.NO_ASSOCIATED_USER_FOUND,
        ),
      );
    }

    // Check if the user already exists
    const existingUser = await this.userRepository.findOne({
      where: { username: user.email },
    });

    let newUser: User;

    if (!existingUser) {
      // Create a new user if not found
      newUser = this.userRepository.create({
        username: user.email,
        createdOn: new Date().toDateString(),
      });

      // Assign default role if available
      const defaultRole = await this.roleService.findByRoleName(RoleEnum.User);
      if (defaultRole) {
        newUser.roles = [defaultRole];
      }
    } else {
      // Use existing user
      newUser = existingUser;
    }

    // Update user's last login time
    newUser.lastLoginTime = new Date().toDateString();

    // Save the user in the database
    const savedUser = await this.userRepository.save(newUser);

    // Retrieve user information with roles
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

    // Return user information, success message, and an access token
    return {
      user: savedUser,
      message: 'Successful Login from Google Oauth',
      accessToken: generateAccessToken(this.jwtService, userWithRoles), // Make sure JwtService is appropriately imported and available
    };
  };
}
