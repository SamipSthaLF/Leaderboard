import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  public roleName: string;
  constructor(roleName: string) {
    this.roleName = roleName;
  }
}
