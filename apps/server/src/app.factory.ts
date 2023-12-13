import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';

export async function createApp() {
  const app = await NestFactory.create(AppModule);
  return app;
}
