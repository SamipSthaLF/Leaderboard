import { ConfigService } from '@nestjs/config';

/**
 * Get seed user information based on the provided ConfigService.
 *
 * @param {ConfigService} configService - The configuration service to retrieve seed user-related settings.
 * @returns {{
 *   username: string
 * }} - Seed user information.
 */
const getSeedUser = (
  configService: ConfigService,
): {
  username: string;
} => {
  return {
    /**
     * The username of the seed user.
     * @type {string}
     */
    username:
      configService.get('SEED_USER_EMAIl') || 'asminshrestha@lftechnology.com', //todo update this 'OR' logic
  };
};

export default getSeedUser;
