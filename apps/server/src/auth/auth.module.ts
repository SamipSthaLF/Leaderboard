import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { ConfigModule } from '@/config/config.module';

import { AuthController } from '@/auth/auth.controller';

import { AuthService } from '@/auth/auth.service';
import { UserService } from '@/user/user.service';
import { ConfigService } from '@/config/config.service';

import { GoogleStrategy } from '@/strategy/google-strategy';

import { User } from '@/user/entities/user.entity';

import { getJwtFactory } from '@/utils/jwt.util';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService): JwtModuleOptions {
        return getJwtFactory(configService);
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UserService],
})
export class AuthModule {}
