import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChallengesSeed } from './seed/challenges.seed';

import { Challenge } from './entities/challenges.entity';

import { ChallengesService } from './challenges.service';

import { ChallengesController } from './challenges.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengesService, ChallengesSeed],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
