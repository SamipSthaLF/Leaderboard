import { registerAs } from '@nestjs/config';

import { GOOGLE_STRATEGY } from '@/constants/key.constant';

/**
 * Configuration module for Google OAuth2 strategy settings.
 *
 * @returns {Object} - The configuration object containing Google OAuth2 strategy settings.
 */
export const googleStrategyConfig = registerAs(GOOGLE_STRATEGY, () => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}));
