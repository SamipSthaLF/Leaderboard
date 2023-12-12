import { registerAs } from '@nestjs/config';

import { DB } from '@/constants/key.constant';

/**
 * Configuration module for the database connection settings.
 *
 * @returns {Object} - The configuration object containing database connection settings.
 */
export const dbConfig = registerAs(DB, () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  enableSync: process.env.ENABLE_DATABASE_SYNCHRONIZE || false,
}));
