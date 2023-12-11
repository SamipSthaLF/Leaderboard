import { JwtModuleOptions, JwtService } from '@nestjs/jwt';

import { User } from '@/user/entities/user.entity';

import { ConfigService } from '@/config/config.service';

/**
 * Retrieves the JWT module options based on the configuration provided by the ConfigService.
 *
 * @param configService - An instance of the ConfigService used to fetch the JWT configuration.
 * @returns JwtModuleOptions - The JWT module options for token generation and validation.
 */
export function getJwtFactory(configService: ConfigService): JwtModuleOptions {
  const { secret } = configService.getJWTConfig();

  return {
    secret,
    global: true,
    signOptions: { expiresIn: '1d' },
  };
}

/**
 * Generates an access token using the JwtService and user information.
 *
 * @param jwtService - An instance of the JwtService used for token signing.
 * @param user - The user object for which the access token is generated.
 * @returns string - The generated JWT access token.
 */
export function generateAccessToken(jwtService: JwtService, user: User) {
  const payload = {
    sub: user.id,
    username: user.username,
    roles: user.roles,
  };

  return jwtService.sign(payload);
}
