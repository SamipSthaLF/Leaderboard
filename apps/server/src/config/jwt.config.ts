import { registerAs } from '@nestjs/config';

import { JWT } from '@/constants/key.constant';

/**
 * Configuration module for JSON Web Token (JWT) settings.
 *
 * @returns {Object} - The configuration object containing JWT settings.
 */
export const jwtConfig = registerAs(JWT, () => ({
  secret: process.env.JWT_SECRET_KEY,
}));
