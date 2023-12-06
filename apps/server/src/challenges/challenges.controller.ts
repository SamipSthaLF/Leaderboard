import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from 'src/decorator/roles.decorator';

import { RoleEnum } from 'src/roles/seed/role.enum';

import { ChallengesDto } from './dto/challenges.dto';

import { ChallengesService } from './challenges.service';

@Controller('challenges')
@ApiBearerAuth()
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() body: ChallengesDto) {
    return this.challengesService.create(body);
  }

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Reviewer, RoleEnum.User)
  @HttpCode(HttpStatus.OK)
  public async getAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Reviewer, RoleEnum.User)
  @HttpCode(HttpStatus.OK)
  public async getById(@Param('id') id: number) {
    const data = await this.challengesService.findByID(id);
    return data;
  }

  @Patch(':id')
  @Roles(RoleEnum.Admin)
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: number,
    @Body() updateChallengesDto: Partial<ChallengesDto>,
  ) {
    return this.challengesService.update(id, updateChallengesDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    return this.challengesService.delete(id);
  }
}
