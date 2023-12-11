import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';
import { ConfigModule } from '@/config/config.module';
import { ChallengesModule } from '@/challenges/challenges.module';

import { AppController } from '@/app.controller';

import { AppService } from '@/app.service';
import { ConfigService } from '@/config/config.service';

import { getDBFactory } from '@/utils/db.util';

import { JwtStrategy } from '@/filter/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return getDBFactory(configService);
      },
    }),
    AuthModule,
    UserModule,
    ChallengesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtStrategy],
})
export class AppModule {}
