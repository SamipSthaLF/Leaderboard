import { Module } from '@nestjs/common';
import { UserrolesService } from './userroles.service';
import { UserrolesController } from './userroles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserService } from 'src/user/user.service';
import { RolesService } from 'src/roles/roles.service';
import { UserroleSeed } from './seed/userroles.seed';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserrolesController],
  providers: [UserrolesService, UserService, RolesService, UserroleSeed],
})
export class UserrolesModule {}
