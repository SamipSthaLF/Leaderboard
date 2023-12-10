import { ConfigService } from '@nestjs/config';

/**
 * Retrieves the configuration for the Google OAuth 2.0 authentication strategy.
 *
 * @param {ConfigService} configService - NestJS ConfigService for accessing configuration values.
 * @returns {{ clientID: string, clientSecret: string, callbackURL: string, scope: string[] }} Configuration for Google OAuth 2.0 strategy.
 */
const getGoogleStrategyConfig = (
  configService: ConfigService,
): {
  // Retrieve configuration values from the environment or use default empty strings
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: string[];
} => {
  // Return the configuration object
  return {
    clientID: configService.get<string>('GOOGLE_CLIENT_ID') ?? '',
    clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') ?? '',
    callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') ?? '',
    // Define default scope for Google OAuth 2.0
    scope: [GoogleScope.Email, GoogleScope.Profile],
  };
};
enum GoogleScope {
  Email = 'email',
  Profile = 'profile',
}
export default getGoogleStrategyConfig;
