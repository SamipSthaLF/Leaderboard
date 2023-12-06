import {
  Get,
  Post,
  Body,
  Patch,
  Param,
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

import { UserrolesService } from '@/userroles/userroles.service';

import { AssignUserroleDto } from '@/userroles/dto/assign-userrole.dto';
import { UpdateUserroleDto } from '@/userroles/dto/update-userrole.dto';

@ApiTags('UserRoles')
@Controller('userroles')
@ApiBearerAuth()
export class UserrolesController {
  constructor(private readonly userrolesService: UserrolesService) {}

  @Post('/assign')
  @ApiCreatedResponse({
    description: 'Assigned role',
  })
  @ApiBadRequestResponse({ description: 'Role cannot be assigned' })
  @HttpCode(HttpStatus.CREATED)
  async assignUserRole(@Body() assingUserroleDto: AssignUserroleDto) {
    return await this.userrolesService.assignUserRole(assingUserroleDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Fetched all user roles',
  })
  @ApiBadRequestResponse({ description: 'user role cannot be fetched' })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userrolesService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'Fetched user role',
  })
  @ApiBadRequestResponse({ description: 'User role cannot be fetched' })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.userrolesService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'Updated user role',
  })
  @ApiBadRequestResponse({ description: 'User role cannot be updated' })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateUserroleDto: UpdateUserroleDto,
  ) {
    return this.userrolesService.update(+id, updateUserroleDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted user role',
  })
  @ApiBadRequestResponse({ description: 'User role cannot be deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.userrolesService.remove(+id);
  }
}
