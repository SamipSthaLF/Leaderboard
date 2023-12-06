import { DataSource } from 'typeorm';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from '@/app.service';

import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';

import { AppController } from '@/app.controller';

import getDBConfig from '@/config/typeorm.config';

import { JwtStrategy } from '@filter/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => getDBConfig(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
