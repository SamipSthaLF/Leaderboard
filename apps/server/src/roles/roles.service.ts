import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const newRole = this.roleRepository.create({
      roleName: createRoleDto.roleName,
    });
    await this.roleRepository.save(newRole);
    return 'This action adds a new role';
  }

  async findAll() {
    return await this.roleRepository.find();
    // return await this.roleRepository.find({ relations: ['users'] });
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
  findByRoleName(roleName: string) {
    return this.roleRepository.findOne({ where: { roleName: roleName } });
  }
}
