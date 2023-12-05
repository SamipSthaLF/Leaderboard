import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from 'src/user/entities/user.entity';

import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';

import getJwtConfiguration from 'src/config/jwt.config';

import { GoogleStrategy } from './strategy/google-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return getJwtConfiguration(configService);
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, RolesService],
})
export class AuthModule {}
