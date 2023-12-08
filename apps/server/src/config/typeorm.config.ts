import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Retrieves the configuration for the PostgreSQL database connection.
 *
 * @param {ConfigService} configService - NestJS ConfigService for accessing configuration values.
 * @returns {TypeOrmModuleOptions} Configuration for  database connection.
 */
const getDBConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  // Specify the database connection type as PostgreSQL
  type: 'postgres',

  // Retrieve configuration values from the environment
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT', 3306),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  autoLoadEntities: true,

  // Enable synchronization (automatic creation of database tables based on entities)
  synchronize:
    configService.get<boolean>('ENABLE_DATABASE_SYNCHRONIZE') || false,
  logger: 'advanced-console', // Enable query logging
  logging: 'all',
  dropSchema: true,
});

export default getDBConfig;
