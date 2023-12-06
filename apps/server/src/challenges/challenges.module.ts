import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChallengesSeed } from '@/challenges/seed/challenges.seed';

import { Challenge } from '@/challenges/entities/challenges.entity';

import { ChallengesService } from '@/challenges/challenges.service';

import { ChallengesController } from '@/challenges/challenges.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengesService, ChallengesSeed],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
