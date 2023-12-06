import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

import { Roles } from '@/decorator/roles.decorator';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
@Roles('Admin')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created a new user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be created' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('Reviewer', 'User', 'Admin')
  @ApiCreatedResponse({
    description: 'Fetched all users',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Users cannot be fetched' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'Fetched user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be fetched' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'Updated user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be updated' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCreatedResponse({
    description: 'Deleted user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be deleted' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('invite')
  @HttpCode(HttpStatus.CREATED)
  inviteNewUser(@Body() inviteNewUserRequest: CreateUserDto) {
    return this.userService.inviteNewUser(inviteNewUserRequest);
  }
}
