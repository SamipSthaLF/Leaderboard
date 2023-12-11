import { registerAs } from '@nestjs/config';

import { SEED_USER } from '@/constants/key.constant';

/**
 * Configuration module for seed user settings.
 *
 * @returns {Object} - The configuration object containing seed user settings.
 */
export const seedUserConfig = registerAs(SEED_USER, () => ({
  email: process.env.SEED_USER_EMAIL,
}));
