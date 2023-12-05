import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  constructor(username: string) {
    this.username = username;
  }
}
