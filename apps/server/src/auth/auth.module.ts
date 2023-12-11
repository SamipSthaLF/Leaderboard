import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from '@/auth/auth.service';
import { UserService } from '@/user/user.service';

import getJwtConfiguration from '@config/jwt.config';

import { AuthController } from '@/auth/auth.controller';

import { GoogleStrategy } from '@/auth/strategy/google-strategy';

import { User } from '@/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return getJwtConfiguration(configService);
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UserService],
})
export class AuthModule {}
