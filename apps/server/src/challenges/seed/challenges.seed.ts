import { Injectable } from '@nestjs/common';

import { ChallengesService } from '@/challenges/challenges.service';

@Injectable()
export class ChallengesSeed {
  constructor(private readonly challengesService: ChallengesService) {}

  /**
   * Seed initial data into the challenges table if no challenges exist.
   * @returns {Promise<void>} - Promise that resolves after seeding data.
   */
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
