import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../user.service';

@Injectable()
export class UserSeed {
  constructor(private readonly userService: UserService) {}

  async seed() {
    // Check if user already exist in the database
    const exisitingUsers = await this.userService.findAll();
    if (exisitingUsers.length === 0) {
      // Users do not exist, seed some initial data
      const seedUser = this.userService.create(
        new CreateUserDto('asminshrestha@lftechnology.com'),
      );

      // Add more users as needed
    }
  }
}
