import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from '@/user/user.service';

import { Roles } from '@/decorator/roles.decorator';
import { User } from './entities/user.entity';

import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

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
  @ApiBadRequestResponse({ description: 'User cannot be deleted' })
  @ApiBadRequestResponse({ description: 'User cannot be created' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Fetched all users',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be fetched' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Fetched a user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be fetched' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Updated user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted a user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }

  @Post('invite')
  @ApiCreatedResponse({
    description: 'Invited a new user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'New user cannot be invited' })
  inviteNewUser(@Body() inviteNewUserRequest: CreateUserDto) {
    return this.userService.inviteNewUser(inviteNewUserRequest);
  }
}
