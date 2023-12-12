import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { dbConfig } from './db.config';
import { appConfig } from './app.config';
import { jwtConfig } from './jwt.config';
import { googleStrategyConfig } from './google-strategy.config';

import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, googleStrategyConfig, jwtConfig],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
