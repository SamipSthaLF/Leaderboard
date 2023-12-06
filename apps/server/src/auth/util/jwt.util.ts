import { JwtService } from '@nestjs/jwt';

import { User } from '@/user/entities/user.entity';

export function generateAccessToken(
  jwtService: JwtService,
  user: User,
): string {
  const payload = {
    sub: user.id,
    username: user.username,
    roles: user.roles.map((role) => role),
  };

  return jwtService.sign(payload);
}
