import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from '@/app.module';

import { ConfigService } from '@/config/config.service';

import { initDataSeed } from '@/utils/seed.util';
import { initSwagger } from '@/utils/swagger.util';

import { JwtAuthGuard } from '@/filter/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port, prefix } = app.get<ConfigService>(ConfigService).getAppConfig();

  app.enableCors();
  app.setGlobalPrefix(prefix);
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  initSwagger(app);
  await initDataSeed(app);

  await app.listen(port);
}
bootstrap();
