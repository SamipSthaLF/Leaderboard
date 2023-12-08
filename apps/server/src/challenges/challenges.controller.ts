import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
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

import { Roles } from 'src/decorator/roles.decorator';

import { RoleEnum } from '@/common/constants/role.enum';

import {
  CreateChallengeDto,
  UpdateChallengeDto,
} from '@/challenges/dto/challenges.dto';

import { ChallengesService } from '@/challenges/challenges.service';

import { Challenge } from '@/challenges/entities/challenges.entity';

@ApiTags('Challenges')
@Controller('challenges')
@ApiBearerAuth()
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiCreatedResponse({
    description: 'Created a new challenge',
    type: Challenge,
  })
  @ApiBadRequestResponse({ description: 'Challenge cannot be created' })
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() body: CreateChallengeDto) {
    return this.challengesService.create(body);
  }

  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.REVIEWER, RoleEnum.USER)
  @ApiCreatedResponse({
    description: 'Fetched all challenges',
    type: Challenge,
  })
  @ApiBadRequestResponse({ description: 'Challenge cannot be fetched' })
  @HttpCode(HttpStatus.OK)
  public async getAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.REVIEWER, RoleEnum.USER)
  @ApiCreatedResponse({
    description: 'Fetched challenge',
    type: Challenge,
  })
  @ApiBadRequestResponse({ description: 'Challenge cannot be fetched' })
  @HttpCode(HttpStatus.OK)
  public async getById(@Param('id') id: number) {
    const data = await this.challengesService.findByID(id);
    return data;
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiCreatedResponse({
    description: 'Updated challenge',
    type: Challenge,
  })
  @ApiBadRequestResponse({ description: 'Challenge cannot be updated' })
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: number,
    @Body() updateChallengesDto: UpdateChallengeDto,
  ) {
    return this.challengesService.update(id, updateChallengesDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiCreatedResponse({
    description: 'Deleted challenge',
    type: Challenge,
  })
  @ApiBadRequestResponse({ description: 'Challenge cannot be deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    return this.challengesService.delete(id);
  }
}
