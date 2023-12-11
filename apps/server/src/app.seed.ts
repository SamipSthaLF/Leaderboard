import { INestApplication } from '@nestjs/common';

import { UserSeed } from '@/user/seed/user.seed';

async function seed(app: INestApplication) {
  /**Seed data
   * Seeds the user to <SEED_USER_EMAIL]> if not present and assign default role to the user
   */
  const userSeed = app.get(UserSeed);

  //seed user
  await userSeed.seed();
}

export { seed };
