import { Request } from 'express';

import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable } from '@nestjs/common';

import { ErrorMessage } from '@common/errors/error.message';
import { RestException } from '@common/exceptions/rest.exception';
import { ErrorDescription } from '@common/errors/constants/description.error';

import { UserDto } from '@/user/dto/user.dto';

import { User } from '@/user/entities/user.entity';

import { generateAccessToken } from '@/auth/util/jwt.util';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
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
   * Creates or updates a user based on the provided User DTO.
   *
   * @param {UserDto} userDto - User data transfer object containing the user's email and other information.
   * @returns {Promise<{ user: User; message: string; accessToken: string }>} Object with user details, message, and access token.
   * @throws {RestException} When `userDto` lacks a valid email or in case of database operation failures.
   */
  private async createUser(userDto: UserDto): Promise<User> {
    return await this.userService.create({
      username: userDto.email,
    });
  }

  /**
   * Service method to create or update a user based on the provided information.
   *
   * @async
   * @function
   * @name createOrUpdateUser
   * @param {User} user - The user information.
   * @returns {Promise<{ user: User, message: string, accessToken: string }>} - An object containing user information, a success message, and an access token.
   * @throws {RestException} - Throws a `RestException` if no associated user is found or an error occurs during the process.
   */
  createOrUpdateUser = async (
    request: Request,
  ): Promise<{ user: User; message: string; accessToken: string }> => {
    const userDto = request.user;
    if (!userDto?.email) {
      throw RestException.throwNoAssociatedUserException();
    }
    // Check if the user already exists
    const user =
      (await this.userService.findByUserName(userDto.email)) ||
      (await this.createUser(userDto));

    if (!user) {
      throw RestException.throwNoAssociatedUserException();
    }

    // Return user information, success message, and an access token
    return {
      user: user,
      message: 'Successful Login from Google Oauth',
      accessToken: generateAccessToken(this.jwtService, user), // Make sure JwtService is appropriately imported and available
    };
  };
}
