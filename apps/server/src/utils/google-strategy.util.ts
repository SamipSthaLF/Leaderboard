import { ConfigService } from '@/config/config.service';

enum GoogleScope {
  Email = 'email',
  Profile = 'profile',
}

/**
 * Retrieves the configuration for the Google OAuth 2.0 authentication strategy.
 *
 * @param {ConfigService} configService - NestJS ConfigService for accessing configuration values.
 * @returns {{ clientID: string, clientSecret: string, callbackURL: string, scope: string[] }} Configuration for Google OAuth 2.0 strategy.
 */
export function getGoogleStrategyConfig(configService: ConfigService) {
  const googleStrategyConfig = configService.getGoogleStrategyConfig();

  return {
    ...googleStrategyConfig,
    scope: [GoogleScope.Email, GoogleScope.Profile],
  };
}
