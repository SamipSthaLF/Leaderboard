import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsNumber,
  ArrayMinSize,
  ArrayNotEmpty,
} from 'class-validator';

export class AssignUserroleDto {
  @IsArray({ message: 'RolesId must be an array' })
  @ArrayNotEmpty({ message: 'RolesId cannot be empty' })
  @ArrayMinSize(1, { message: 'At least one role must be assigned' })
  @IsNumber(
    {},
    { each: true, message: 'Each element in rolesId must be a number' },
  )
  @ApiProperty({ default: [1] })
  rolesId: number[];

  @IsNumber({}, { message: 'UserId must be a number' })
  @ApiProperty({ default: 1 })
  userId: number;
}
