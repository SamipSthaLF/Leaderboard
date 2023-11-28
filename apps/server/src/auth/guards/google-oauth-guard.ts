import { Injectable, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
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
