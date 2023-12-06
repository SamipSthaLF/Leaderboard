import { PartialType } from '@nestjs/mapped-types';

import { IsNumber } from 'class-validator';

import { CreateRoleDto } from '@/roles/dto/create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNumber()
  id: number;
}
