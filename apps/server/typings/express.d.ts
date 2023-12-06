import { UserDto } from '@/user/dto/user.dto';

declare module 'express' {
  interface Request {
    user?: UserDto;
  }
}
