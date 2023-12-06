import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@/user/user.service';
import { User } from '@/user/entities/user.entity';

import { Role } from '@/roles/entities/role.entity';
import { RolesService } from '@/roles/roles.service';

import { UserroleSeed } from '@/userroles/seed/userroles.seed';
import { UserrolesService } from '@/userroles/userroles.service';
import { UserrolesController } from '@/userroles/userroles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserrolesController],
  providers: [UserrolesService, UserService, RolesService, UserroleSeed],
})
export class UserrolesModule {}
