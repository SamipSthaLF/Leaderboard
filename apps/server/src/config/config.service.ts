import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  /**
   * Retrieves a configuration value based on the provided key.
   *
   * @template T - The type of the configuration value.
   * @param key - The key for the configuration value.
   * @returns T - The retrieved configuration value.
   * @throws Error - If the configuration value is undefined.
   */
  get<T>(key: string): T {
    const value = this.configService.get<T>(key);

    if (!value) {
      throw new Error(`Config for ${key} os undefined`);
    }

    return value;
  }

  /**
   * Retrieves application configuration settings.
   *
   * @returns {Object} - Application configuration object.
   */
  getAppConfig() {
    return {
      port: this.get<number>('app.port'),
      prefix: this.get<string>('app.prefix'),
    };
  }

  /**
   * Retrieves database connection configuration settings.
   *
   * @returns {Object} - Database configuration object.
   */
  getDBConfig() {
    return {
      type: this.get<'postgres'>('db.type'),
      host: this.get<string>('db.host'),
      port: this.get<number>('db.port'),
      dbName: this.get<string>('db.name'),
      username: this.get<string>('db.username'),
      password: this.get<string>('db.password'),
      enableSync: this.get<boolean>('db.enableSync'),
    };
  }

  /**
   * Retrieves Google OAuth2 strategy configuration settings.
   *
   * @returns {Object} - Google OAuth2 strategy configuration object.
   */
  getGoogleStrategyConfig() {
    return {
      clientID: this.get<string>('google-strategy.clientID'),
      clientSecret: this.get<string>('google-strategy.clientSecret'),
      callbackURL: this.get<string>('google-strategy.callbackURL'),
    };
  }

  /**
   * Retrieves JWT configuration settings.
   *
   * @returns {Object} - JWT configuration object.
   */
  getJWTConfig() {
    return {
      secret: this.get<string>('jwt.secret'),
    };
  }

  /**
   * Retrieves seed user configuration settings.
   *
   * @returns {Object} - Seed user configuration object.
   */
  getSeedUserConfig() {
    return {
      email: this.get<string>('seed-user.email'),
    };
  }
}
