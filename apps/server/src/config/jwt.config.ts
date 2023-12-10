import { ConfigService } from '@nestjs/config';

// Adjust the expiration time as needed
const expiresIn = '1h'; //define the jwt token to be expired in 1 hour.

/**
 * Get JWT configuration options based on the provided ConfigService.
 *
 * @param {ConfigService} configService - The configuration service to retrieve JWT-related settings.
 * @returns {{
 *   secret: string,
 *   signOptions: {
 *     expiresIn: string
 *   }
 * }} - JWT configuration options.
 */
const getJwtConfiguration = (
  configService: ConfigService,
): {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
} => {
  return {
    /**
     * The JWT secret key used for signing.
     *
     * @type {string}
     */
    secret: configService.get('JWT_SECRET_KEY') || '',

    /**
     * Sign options for JWT.
     * @type {{
     *   expiresIn: string
     * }}
     */
    signOptions: { expiresIn: expiresIn },
  };
};

export default getJwtConfiguration;
