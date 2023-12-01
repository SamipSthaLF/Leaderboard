import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';

import { GoogleStrategy } from './strategy/google-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';
import getJwtConfiguration from 'src/config/jwt.config';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';

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
