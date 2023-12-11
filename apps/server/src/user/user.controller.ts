import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { UserService } from '@/user/user.service';

import { Roles } from '@/decorator/roles.decorator';
import { User } from './entities/user.entity';

import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

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
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }

  @Post('invite')
  @HttpCode(HttpStatus.CREATED)
  inviteNewUser(@Body() inviteNewUserRequest: CreateUserDto) {
    return this.userService.inviteNewUser(inviteNewUserRequest);
  }
}
