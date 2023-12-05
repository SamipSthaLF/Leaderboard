import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from '@/app.module';

import { UserSeed } from '@/user/seed/user.seed';

import { RoleSeed } from '@/roles/seed/roles.seed';

import { UserroleSeed } from '@/userroles/seed/userroles.seed';

import { JwtAuthGuard } from '@filter/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  /**Seed data
   * 1. Seeds the role to [Admin, User, Reviewer] if not present
   * 2. Seeds the user to <SEED_USER_EMAIL]> if not present
   * 3. Seeds the userrole making <SEED_USER_EMAIL> a ADMIN if not present
   */
  const roleSeed = app.get(RoleSeed); // Inject RoleSeed
  const userSeed = app.get(UserSeed);
  const userroleSeed = app.get(UserroleSeed);

  //seed role
  await roleSeed.seed();

  //seed user
  await userSeed.seed();

  //seed userrole
  await userroleSeed.seed();

  await app.listen(3001);
}
bootstrap();
