import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback } from 'passport-google-oauth2';

import { ConfigService } from '@/config/config.service';

import { GoogleProfile } from '@/interface/google-profile.interface';
import { getGoogleStrategyConfig } from '@/utils/google-strategy.util';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  /**
   * Creates an instance of GoogleStrategy.
   *
   * @param {ConfigService} configService - NestJS ConfigService for accessing configuration values.
   */
  constructor(private readonly configService: ConfigService) {
    const googleConfig = getGoogleStrategyConfig(configService);

    super(googleConfig);
  }

  /**
   * Validate and transform user profile data received from Google OAuth 2.0.
   *
   * @param {string} accessToken - Google OAuth 2.0 access token.
   * @param {string} refreshToken - Google OAuth 2.0 refresh token.
   * @param {GoogleProfile} profile - User profile data received from Google.
   * @param {VerifyCallback} done - Passport callback for completing the authentication process.
   * @returns {Promise<void>} A Promise resolving to the transformed user object.
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile, //if other properties are need add to GoogleProfile
    done: VerifyCallback,
  ) {
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
