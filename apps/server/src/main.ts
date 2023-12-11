import { Reflector } from '@nestjs/core';

import { createApp } from '@/app.factory';

import { JwtAuthGuard } from '@filter/jwt-auth.guard';

async function bootstrap() {
  const app = await createApp();

  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  await app.listen(3001);
}
bootstrap();
