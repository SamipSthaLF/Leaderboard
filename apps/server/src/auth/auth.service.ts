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

import { generateAccessToken } from '@/auth/util/jwt.util';
import { UserDto } from '@/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

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
    userDto: UserDto,
  ): Promise<{ user: User; message: string; accessToken: string }> => {
    if (!userDto || !userDto.email) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatus.NOT_ACCEPTABLE.toLocaleString(),
          ErrorDescription.NO_ASSOCIATED_USER_FOUND,
        ),
      );
    }

    // Check if the user already exists
    let user: User | null = await this.userRepository.findOne({
      where: { username: userDto.email },
    });

    if (!user) {
      // Create a new user if not found
      user = this.userRepository.create({
        username: userDto.email,
        createdOn: new Date().toDateString(),
      });

      // Assign default role
      user.roles = [RoleEnum.Default];
    }

    // Save the user in the database
    const savedUser = await this.userRepository.save(user);

    if (!savedUser) {
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
      accessToken: generateAccessToken(this.jwtService, savedUser), // Make sure JwtService is appropriately imported and available
    };
  };
}
