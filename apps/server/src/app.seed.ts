import { createApp } from '@/app.factory';

import { UserSeed } from '@/user/seed/user.seed';

async function seed() {
  const app = await createApp();

  /**Seed data
   * Seeds the user to <SEED_USER_EMAIL]> if not present and assign default role to the user
   */
  const userSeed = app.get(UserSeed);

  //seed user
  await userSeed.seed();
}

export { seed };
