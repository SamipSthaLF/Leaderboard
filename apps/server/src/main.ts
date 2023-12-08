import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from '@/app.module';

import { setupSwagger } from '../swagger.config';

import { UserSeed } from '@/user/seed/user.seed';

import { JwtAuthGuard } from '@filter/jwt-auth.guard';
import { ChallengesSeed } from './challenges/seed/challenges.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  setupSwagger(app);

  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  /**Seed data
   * Seeds the user to <SEED_USER_EMAIL]> if not present and assign default role to the user
   * Seeds the challenges table
   */
  const userSeed = app.get(UserSeed);

  //seed user
  await userSeed.seed();

  const challengesSeed = app.get(ChallengesSeed);
  await challengesSeed.seed();

  await app.listen(3001);
}
bootstrap();
