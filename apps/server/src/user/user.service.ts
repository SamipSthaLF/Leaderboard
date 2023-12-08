import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { User } from '@/user/entities/user.entity';

import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

import { ErrorMessage } from '@common/errors/error.message';
import { RestException } from '@common/exceptions/rest.exception';
import { ErrorDescription } from '@common/errors/constants/description.error';

import { RoleEnum } from '@/common/constants/role.enum';

import { RoleEnum } from '@/common/constants/role.enum';

/**
 * Service responsible for handling CRUD operations related to users.
 * @class
 */
@Injectable()
export class UserService {
  /**
   * Constructor to inject the TypeORM repository for the `User` entity.
   * @constructor
   * @param {Repository<User>} userRepository - The TypeORM repository for the `User` entity.
   */
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user based on the provided DTO.
   * @param {CreateUserDto} createUserDto - The DTO containing user creation information.
   * @returns {Promise<User>} - A message indicating the success of the operation.
   */
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      username: createUserDto.username,
      roles: [RoleEnum.USER],
    });
    return this.userRepository.save(user);
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<User[]>} - An array of users with associated roles.
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Retrieves a user by its ID.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<User>} - The user entity.
   */
  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  /**
   * Updates a user based on the provided ID and DTO.
   *
   * @async
   *
   * @async
   * @param {number} id - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - The DTO containing user update information.
   * @param {Request} request - The request from express.
   * @returns {Promise<user>} -Promise<User>
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!existingUser) {
      throw RestException.throwNoAssociatedUserException();
    }
    const updatedRoles: RoleEnum[] = updateUserDto.roles.map(
      (roleString: string) => {
        // Assuming RoleEnum has a method to convert string to enum
        return RoleEnum[roleString as keyof typeof RoleEnum];
      },
    );
    //todo fix logic of multiple addition of roles for the user. //replace duplicate

    existingUser.roles = [...existingUser.roles, ...updatedRoles];
    return await this.userRepository.save(existingUser);
  }

  /**
   * Removes a user based on the provided ID.
   * @async
   * @async
   * @async
   * @param {number} id - The ID of the user to remove.
   * @returns {Promise<{ message: string }>} - An object containing a message indicating the success of the operation.
   * @throws {RestException} - Throws a `RestException` if an error occurs during the deletion process.
   */
  async remove(id: number) {
    const existingUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!existingUser) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatus.NOT_ACCEPTABLE.toLocaleString(),
          ErrorDescription.USER_ALREADY_INVITED,
        ),
      );
    }
    await this.userRepository.softDelete(id);
    return {
      message: 'User deleted!',
    };
  }

  /**
   * Saves a user in the database.
   * @async
   * @param {User} user - The user entity to be saved.
   * @returns {Promise<void>} - A promise indicating the completion of the operation.
   */
  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  /**
   * Retrieves a user by its username.
   * @async
   * @param {string} username - The username of the user to retrieve.
   * @returns {Promise<User>} - The user entity.
   */
  async findByUserName(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  /**
   * Invites a new user based on the provided DTO.
   * @async
   * @param {CreateUserDto} inviteNewUserRequest - The DTO containing user invitation information.
   * @returns {Promise<{ message: string, user: User }>} - An object containing a message and the created user entity.
   * @throws {RestException} - Throws a `RestException` if the user is already invited.
   */
  async inviteNewUser(
    inviteNewUserRequest: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    // TODO: Send email with a redirect link to login.
    const user = await this.findByUserName(inviteNewUserRequest.username);

    if (!user) {
      const newUser = this.userRepository.create({
        username: inviteNewUserRequest.username,
      });

      await this.saveUser(newUser);

      return {
        message: 'User invitation has been created.',
        user: newUser,
      };
    }

    throw new RestException(
      new ErrorMessage(
        HttpStatus.NOT_ACCEPTABLE,
        HttpStatus.NOT_ACCEPTABLE.toLocaleString(),
        ErrorDescription.USER_ALREADY_INVITED,
      ),
    );
  }
}
