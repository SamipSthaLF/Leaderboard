import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { Challenge } from './entities/challenges.entity';
import { ChallengesSeed } from './seed/challenges.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengesService, ChallengesSeed],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
