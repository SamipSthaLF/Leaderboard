import { DataSource } from 'typeorm';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from '@/app.service';

import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';

import { AppController } from '@/app.controller';

import getDBConfig from '@/config/typeorm.config';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { UserrolesModule } from './userroles/userroles.module';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './filter/jwt.strategy';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => getDBConfig(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RolesModule,
    UserrolesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtStrategy],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
