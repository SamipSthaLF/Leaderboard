import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigService } from '@/config/config.service';

/**
 * Retrieves the TypeORM module options based on the configuration provided by the ConfigService.
 *
 * @param configService - An instance of the ConfigService used to fetch the database configuration.
 * @returns TypeOrmModuleOptions - The TypeORM module options for database connection.
 */
export function getDBFactory(
  configService: ConfigService,
): TypeOrmModuleOptions {
  const {
    type,
    host,
    port,
    username,
    password,
    enableSync,
    dbName: database,
  } = configService.getDBConfig();

  return {
    type,
    host,
    port,
    username,
    password,
    database,
    logging: 'all',
    synchronize: enableSync,
    autoLoadEntities: true,
    logger: 'advanced-console',
  };
}
