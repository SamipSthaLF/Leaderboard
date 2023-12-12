import { registerAs } from '@nestjs/config';

import { APP } from '@/constants/key.constant';

/**
 * Configuration module for the application settings.
 *
 * @returns {Object} - The configuration object containing application settings.
 */
export const appConfig = registerAs(APP, () => ({
  port: Number(process.env.APP_PORT) || 8000,
  prefix: process.env.APP_PREFIX || 'api/v1',
}));
