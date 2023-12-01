import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from '@/app.module';

import { UserSeed } from '@/user/seed/user.seed';

import { JwtAuthGuard } from '@filter/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  /**Seed data
   * Seeds the user to <SEED_USER_EMAIL]> if not present and assign default role to the user
   */
  const userSeed = app.get(UserSeed);

  //seed user
  await userSeed.seed();

  const roleSeed = app.get(RoleSeed); // Inject RoleSeed
  await roleSeed.seed();
  const userSeed = app.get(UserSeed);
  await userSeed.seed();
  const userroleSeed = app.get(UserroleSeed);
  await userroleSeed.seed();
  await app.listen(3001);
}
bootstrap();
