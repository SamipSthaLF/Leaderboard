import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback } from 'passport-google-oauth2';

import getGoogleStrategyConfig from 'src/config/googlestrategy.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  /**
   * Creates an instance of GoogleStrategy.
   *
   * @param {ConfigService} configService - NestJS ConfigService for accessing configuration values.
   */
  constructor(configService: ConfigService) {
    super(getGoogleStrategyConfig(configService));
  }
  /**
   * Validate and transform user profile data received from Google OAuth 2.0.
   *
   * @param {string} accessToken - Google OAuth 2.0 access token.
   * @param {string} refreshToken - Google OAuth 2.0 refresh token.
   * @param {any} profile - User profile data received from Google.
   * @param {VerifyCallback} done - Passport callback for completing the authentication process.
   * @returns {Promise<any>} A Promise resolving to the transformed user object.
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // Extract relevant information from the Google profile
    const { name, emails, photos } = profile;

    // Construct a user object with extracted information
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    // Invoke the Passport callback with the transformed user object
    done(null, user);
  }
}
