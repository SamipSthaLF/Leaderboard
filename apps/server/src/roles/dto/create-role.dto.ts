import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  public roleName: string;
  constructor(roleName: string) {
    this.roleName = roleName;
  }
}
