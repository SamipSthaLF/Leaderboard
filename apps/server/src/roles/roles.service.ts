import { Repository } from 'typeorm';

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from './entities/role.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RestException } from 'src/common/exceptions/rest.exception';
import { ErrorMessage } from 'src/common/errors/error.message';
import { ErrorDescription } from 'src/common/errors/constants/description.error';

/**
 * Service responsible for handling CRUD operations related to roles.
 * @class
 */
@Injectable()
export class RolesService {
  /**
   * Constructor to inject the TypeORM repository for the `Role` entity.
   * @constructor
   * @param {Repository<Role>} roleRepository - The TypeORM repository for the `Role` entity.
   */
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  /**
   * Creates a new role based on the provided DTO.
   * @async
   * @param {CreateRoleDto} createRoleDto - The DTO containing role creation information.
   * @returns {Promise<{ message: string, role: Role }>} - An object containing a message and the created role entity.
   */
  async create(
    createRoleDto: CreateRoleDto,
  ): Promise<{ message: string; role: Role }> {
    // Create a new role entity
    const newRole = this.roleRepository.create({
      roleName: createRoleDto.roleName,
    });

    // Save the new role in the database
    const savedRole = await this.roleRepository.save(newRole);

    // Return a success message and the created role entity
    return {
      message: 'Role created successfully!',
      role: savedRole,
    };
  }

  /**
   * Retrieves all roles from the database.
   * @async
   * @returns {Promise<Role[]>} - An array of roles.
   */
  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
    // Uncomment the line below if you want to include relations
    // return await this.roleRepository.find({ relations: ['users'] });
  }

  /**
   * Retrieves a role by its ID.
   * @param {number} id - The ID of the role to retrieve.
   * @returns {Promise<Role>} - The role entity.
   */
  async findOne(id: number) {
    return this.roleRepository.findOne({ where: { id: id } });
  }
  /**
   * Updates a role based on the provided ID and DTO.
   * @async
   * @param {number} id - The ID of the role to update.
   * @param {CreateRoleDto} updateRoleRequest - The DTO containing role update information.
   * @returns {Promise<{ message: string,role: Role }>} - An object containing a message indicating the success of the operation.
   * @throws {RestException} - Throws a `RestException` if the role is not present or an error occurs during the update.
   */
  async update(id: number, updateRoleRequest: CreateRoleDto) {
    const existingRole = await this.roleRepository.findOne({
      where: { id: id },
    });
    if (!existingRole) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatus.NOT_ACCEPTABLE.toLocaleString(),
          ErrorDescription.ROLE_NOT_PRESENT,
        ),
      );
    }
    existingRole.roleName = updateRoleRequest.roleName;
    const updatedRole = await this.roleRepository.update(id, existingRole);
    return {
      message: 'Role updated successfully!',
      role: updatedRole,
    };
  }

  /**
   * Removes a role based on the provided ID.
   * @async
   * @param {number} id - The ID of the role to remove.
   * @returns {Promise<{ message: string }>} - An object containing a message indicating the success of the operation.
   * @throws {RestException} - Throws a `RestException` if the role is not present.
   */
  async remove(id: number) {
    const role = await this.roleRepository.findOne({ where: { id: id } });
    if (!role) {
      throw new RestException(
        new ErrorMessage(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatus.NOT_ACCEPTABLE.toString(),
          ErrorDescription.ROLE_NOT_PRESENT,
        ),
      );
    }
    // Soft delete the role
    this.roleRepository.softDelete(role.id);
    // Return a success message
    return {
      message: 'Role deleted successfully',
    };
  }

  /**
   * Retrieves a role by its name.
   * @param {string} roleName - The name of the role to retrieve.
   * @returns {Promise<Role>} - The role entity.
   */
  async findByRoleName(roleName: string) {
    return await this.roleRepository.findOne({ where: { roleName: roleName } });
  }
}
