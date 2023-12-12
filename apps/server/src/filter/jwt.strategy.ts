import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';

import { ConfigService } from '@/config/config.service';

import { getJwtFactory } from '@/utils/jwt.util';

interface JwtPayload {
  sub: number;
  username: string;
  roles: string[];
  iat: number;
  exp: number;
}

/**
 * Custom JWT strategy for passport authentication.
 * @class
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor to inject the `ConfigService`.
   * @constructor
   * @param {ConfigService} configService - The configuration service for accessing application configurations.
   */
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getJwtFactory(configService).secret,
    });
  }

  /**
   * Validates the payload extracted from the JWT token.
   * @param {JwtPayload} payload - The payload from the JWT token.
   * @returns {Promise<object>} - An object containing validated user information.
   */
  async validate(payload: JwtPayload): Promise<object> {
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
