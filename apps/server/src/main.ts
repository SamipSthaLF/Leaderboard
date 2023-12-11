import { Reflector } from '@nestjs/core';

import { INestApplication } from '@nestjs/common';

import { createApp } from '@/app.factory';

import { AppModule } from '@/app.module';


import { setupSwagger } from '../swagger.config';


import { JwtAuthGuard } from '@filter/jwt-auth.guard';

async function bootstrap() {
  const app = await createApp();

  // Setup Swagger
  setupSwagger(app);

  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  await app.listen(3001);
}
bootstrap();