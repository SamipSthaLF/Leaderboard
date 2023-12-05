import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleSeed } from '@/roles/seed/roles.seed';
import { Role } from '@/roles/entities/role.entity';
import { RolesService } from '@/roles/roles.service';
import { RolesController } from '@/roles/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService, RoleSeed],
})
export class RolesModule {}
