import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ErrorDescription } from 'src/common/errors/constants/description.error';
import { ErrorMessage } from 'src/common/errors/error.message';
import { RestException } from 'src/common/exceptions/rest.exception';
import { ROLES_KEY } from 'src/decorator/roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthSkipped = this.reflector.getAllAndOverride<boolean>(
      'skipAuth',
      [context.getHandler(), context.getClass()],
    );

    if (isAuthSkipped) {
      return true; // Skip authentication for routes marked with @SkipAuth
    }
    // Continue with the authentication
    const canActivate = await super.canActivate(context);
    if (canActivate) {
      // Check if user has the required roles from the token
      const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      console.log(roles);
      if (roles && roles.length > 0) {
        const request = await context.switchToHttp().getRequest();
        const user = request.user;
        if (
          !user ||
          !user.roles ||
          !roles.some((role) => user.roles.includes(role))
        ) {
          throw new UnauthorizedException(
            'User does not have the required roles',
          );
        }
      }

      return true; // Authentication and role check successful
    }
    return false; // Authentication failed
  }
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      const unauthorizedException = new UnauthorizedException();
      const errorMessage = new ErrorMessage(
        unauthorizedException.getStatus(),
        unauthorizedException.message,
        ErrorDescription.UNAUTHORIZED_USER,
      );
      throw new RestException(errorMessage);
    }
    return user;
  }
}
