import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthenticationGuard extends AuthGuard('google') {
  /**
   * Creates an instance of AuthenticationGuard.
   * @param {ConfigService} configService - NestJS ConfigService for accessing configuration values.
   */
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
  /**
   * Determine if the route should be activated for authentication.
   *
   * @param {ExecutionContext} context - NestJS ExecutionContext containing information about the current execution context.
   * @returns {boolean} A boolean indicating whether the route should be activated for authentication.
   */
  canActivate(context: ExecutionContext) {
    // Check if x-api-key is present in the headers
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (apiKey) {
      // If x-api-key is present, bypass authentication
      return true;
    }

    // If x-api-key is not present, proceed with the default authentication logic
    return super.canActivate(context);
  }
}
