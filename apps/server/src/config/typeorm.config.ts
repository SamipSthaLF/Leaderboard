import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

/**
 * Retrieves the configuration for the PostgreSQL database connection.
 *
 * @param {ConfigService} configService - NestJS ConfigService for accessing configuration values.
 * @returns {PostgresConnectionOptions} Configuration for PostgreSQL database connection.
 */ const getDBConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
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
  synchronize: true, //todo dev =true
});

export default getDBConfig;
