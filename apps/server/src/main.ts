import { Reflector } from '@nestjs/core';

import { createApp } from '@/app.factory';

import { JwtAuthGuard } from '@filter/jwt-auth.guard';
import { seed } from '@/app.seed';

async function bootstrap() {
  const app = await createApp();

  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  await seed(app);

  await app.listen(3001);
}
bootstrap();
