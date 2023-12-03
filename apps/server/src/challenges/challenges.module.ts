import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';

@Module({
  providers: [ChallengesService],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
