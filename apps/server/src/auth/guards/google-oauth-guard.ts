import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

const accessType = 'offline' as const; // define accesstype of string literal

@Injectable()
export class AuthenticationGuard extends AuthGuard('google') {
  /**
   * Creates an instance of AuthenticationGuard.
   * @param {ConfigService} configService - NestJS ConfigService for accessing configuration values.
   */
  constructor(private configService: ConfigService) {
    super({
      accessType: accessType,
    });
  }

  /**
   * Determine if the route should be activated for authentication.
   *
   * @param {ExecutionContext} context - NestJS ExecutionContext containing information about the current execution context.
   * @returns {boolean} A boolean indicating whether the route should be activated for authentication.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if x-api-key is present in the headers
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (apiKey) {
      // If x-api-key is present, bypass authentication
      return true;
    }
    // If x-api-key is not present, proceed with the default authentication logic
    const result = await super.canActivate(context);
    return result as boolean;
  }
}
