import { ApiProperty } from '@nestjs/swagger';

import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNumber,
} from 'class-validator';

export class AssignUserroleDto {
  @IsArray({ message: 'RolesId must be an array' })
  @ArrayNotEmpty({ message: 'RolesId cannot be empty' })
  @ArrayMinSize(1, { message: 'At least one role must be assigned' })
  @IsNumber(
    {},
    { each: true, message: 'Each element in rolesId must be a number' },
  )
  @ApiProperty()
  rolesId: number[];

  @IsNumber({}, { message: 'UserId must be a number' })
  @ApiProperty()
  userId: number;
}
