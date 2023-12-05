import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

import { UserroleSeed } from './seed/userroles.seed';

import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';

import { UserrolesService } from './userroles.service';
import { UserrolesController } from './userroles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserrolesController],
  providers: [UserrolesService, UserService, RolesService, UserroleSeed],
})
export class UserrolesModule {}
