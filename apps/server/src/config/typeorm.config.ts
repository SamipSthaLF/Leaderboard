import { ConfigService } from '@nestjs/config';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const getDBConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT', 3306),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [], // Add your entities here
  synchronize: true,
});

export default getDBConfig;
