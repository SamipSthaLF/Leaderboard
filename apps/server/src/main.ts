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

  const roleSeed = app.get(RoleSeed); // Inject RoleSeed
  await roleSeed.seed();
  const userSeed = app.get(UserSeed);
  await userSeed.seed();
  const userroleSeed = app.get(UserroleSeed);
  await userroleSeed.seed();
  await app.listen(3001);
}
bootstrap();
