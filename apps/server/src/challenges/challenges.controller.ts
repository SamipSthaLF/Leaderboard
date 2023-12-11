import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

import { Roles } from '@/decorator/roles.decorator';

import { RoleEnum } from '@/common/constants/role.enum';

import { CreateChallengeDto } from '@/challenges/dto/create-challenges.dto';

import { ChallengesService } from '@/challenges/challenges.service';

import { UpdateChallengeDto } from '@/challenges/dto/update-challenge.dto';
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
  public async post(@Body() body: CreateChallengeDto) {
    return this.challengesService.create(body);
  }

  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.REVIEWER, RoleEnum.USER)
  @ApiOkResponse({
    description: 'Fetched all challenges',
    type: Challenge,
  })
  @ApiBadRequestResponse({ description: 'Challenge cannot be fetched' })
  public async getAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.REVIEWER, RoleEnum.USER)
  @ApiOkResponse({
    description: 'Fetched challenge',
    type: Challenge,
  })
  @ApiBadRequestResponse({ description: 'Challenge cannot be fetched' })
  public async getById(@Param('id') id: number) {
    const data = await this.challengesService.findByID(id);
    return data;
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOkResponse({
    description: 'Updated challenge',
    type: Challenge,
  })
  @ApiBadRequestResponse({ description: 'Challenge cannot be updated' })
  public async update(
    @Param('id') id: number,
    @Body() updateChallengesDto: UpdateChallengeDto,
  ) {
    return this.challengesService.update(id, updateChallengesDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOkResponse({
    description: 'Deleted challenge',
    type: Challenge,
  })
  @ApiBadRequestResponse({ description: 'Challenge cannot be deleted' })
  public async delete(@Param('id') id: number) {
    return this.challengesService.delete(id);
  }
}
