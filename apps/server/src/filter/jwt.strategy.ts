import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';

import getJwtConfiguration from '@config/jwt.config';

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
      secretOrKey: getJwtConfiguration(configService).secret,
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

/**
 * Interface representing the payload of a JSON Web Token (JWT).
 *
 * @interface JwtPayload
 */
interface JwtPayload {
  /**
   * User ID associated with the JWT.
   *
   * @type {number}
   */
  sub: number;

  /**
   * Username associated with the JWT.
   *
   * @type {string}
   */
  username: string;

  /**
   * Array of roles assigned to the user in the JWT.
   *
   * @type {string[]}
   */
  roles: string[];

  /**
   * Issued At timestamp indicating when the JWT was created.
   *
   * @type {number}
   */
  iat: number;

  /**
   * Expiration timestamp indicating when the JWT expires.
   * @type {number}
   */
  exp: number;
}
