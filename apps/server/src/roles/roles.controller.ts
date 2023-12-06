import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { RolesService } from '@/roles/roles.service';
import { CreateRoleDto } from '@/roles/dto/create-role.dto';
import { Role } from './entities/role.entity';
import { RoleEnum } from '@/common/constants/role.enum';
import { Roles } from '@/decorator/roles.decorator';

@ApiTags('Roles')
@Controller('roles')
@Roles(RoleEnum.Admin)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created a new role',
    type: Role,
  })
  @ApiBadRequestResponse({ description: 'Role cannot be created' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiBadRequestResponse({ description: 'Role cannot be fetched' })
  @ApiCreatedResponse({
    description: 'Fetched all roles',
    type: Role,
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'Fetched role',
    type: Role,
  })
  @ApiBadRequestResponse({ description: 'Role cannot be fetched' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'Updated role',
    type: Role,
  })
  @ApiBadRequestResponse({ description: 'Role cannot be updated' })
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateRoleRequest: CreateRoleDto) {
    return this.rolesService.update(+id, updateRoleRequest);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCreatedResponse({
    description: 'Deleted role',
    type: Role,
  })
  @ApiBadRequestResponse({ description: 'Role cannot be deleted' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
