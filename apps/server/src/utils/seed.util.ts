import { INestApplication } from '@nestjs/common';

import { UserSeed } from '@/user/seed/user.seed';
import { ChallengesSeed } from '@/challenges/seed/challenges.seed';

/**
 * Initializes data seeding for the application by invoking seed methods for User and Challenges.
 *
 * @param app - An instance of INestApplication representing the Nest.js application.
 * @returns {Promise<void>} - A Promise that resolves when the seeding process is complete.
 */
export async function initDataSeed(app: INestApplication) {
  const userSeed = app.get<UserSeed>(UserSeed).seed();
  const challengesSeed = app.get<ChallengesSeed>(ChallengesSeed).seed();

  await Promise.all([userSeed, challengesSeed]);
}
