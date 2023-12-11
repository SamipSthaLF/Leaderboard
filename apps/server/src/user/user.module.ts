import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSeed } from '@/user/seed/user.seed';

import { UserService } from '@/user/user.service';

import { User } from '@/user/entities/user.entity';

import { UserController } from '@/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserSeed, JwtService],
})
export class UserModule {}
