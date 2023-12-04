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
import { ChallengesService } from './challenges.service';
import { ChallengesDto } from './dto/challenges.dto';

@Controller('challenges')
@Roles('Admin')
@ApiBearerAuth()
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post('add-challenge')
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() body: ChallengesDto): Promise<any> {
    return this.challengesService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getById(@Param('id') id: number) {
    const data = await this.challengesService.findByID(id);
    return data;
  }

  @Patch('id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: number,
    @Body() updateChallengesDto: Partial<ChallengesDto>,
  ) {
    return this.challengesService.update(id, updateChallengesDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    return this.challengesService.delete(id);
  }
}
