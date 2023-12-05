import { Injectable } from '@nestjs/common';

import { ChallengesService } from '../challenges.service';
@Injectable()
export class ChallengesSeed {
  constructor(private readonly challengesService: ChallengesService) {}

  async seed() {
    const existingChallenges = await this.challengesService.findAll();
    if (existingChallenges.length === 0) {
      this.challengesService.create({
        points: 12,
        author_id: 1,
        title: 'Mentor Kids',
        privacy: 'private',
        description: 'Mentor kids as your priority',
      });
    }
  }
}
