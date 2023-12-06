import { AppModule } from './app.module';

import { UserSeed } from './user/seed/user.seed';

import { RoleSeed } from './roles/seed/roles.seed';

import { NestFactory, Reflector } from '@nestjs/core';

import { JwtAuthGuard } from './filter/jwt-auth.guard';
import { ChallengesSeed } from './challenges/seed/challenges.seed';

import { UserroleSeed } from './userroles/seed/userroles.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  const roleSeed = app.get(RoleSeed); // Inject RoleSeed
  await roleSeed.seed();
  const userSeed = app.get(UserSeed);
  await userSeed.seed();
  const challengesSeed = app.get(ChallengesSeed);
  await challengesSeed.seed();
  const userroleSeed = app.get(UserroleSeed);
  await userroleSeed.seed();
  await app.listen(3001);
}
bootstrap();
