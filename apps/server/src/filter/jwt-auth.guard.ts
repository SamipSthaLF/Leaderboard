import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@/user/entities/user.entity';

import { ROLES_KEY } from '@decorator/roles.decorator';

import { ErrorMessage } from '@common/errors/error.message';
import { RestException } from '@common/exceptions/rest.exception';
import { ErrorDescription } from '@common/errors/constants/description.error';
import { SKIP_AUTH_KEY } from '@/decorator/skip-auth.decorator';

/**
 * Custom JWT authentication guard that extends the `AuthGuard` from `@nestjs/passport`.
 * This guard also checks for roles specified using the `Roles` decorator.
 * @class
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Constructor to inject the `Reflector` service.
   * @constructor
   * @param {Reflector} reflector - The `Reflector` service for metadata reflection.
   */
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Checks if the route should be authenticated and validates roles.
   * @param {ExecutionContext} context - The execution context of the route.
   * @returns {Promise<boolean>} - A boolean indicating whether the route can be accessed.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthSkipped = this.reflector.getAllAndOverride<boolean>(
      SKIP_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isAuthSkipped) {
      return true; // Skip authentication for routes marked with @SkipAuth
    }

    // Continue with the authentication
    const canActivate = await super.canActivate(context);

    if (!canActivate) {
      return false; // Authentication failed
    }

    // Check if the user has the required roles from the token
    //check for controller roles
    const controllerRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getClass()],
    );

    //check for method roles
    const methodRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
    ]);
    /**   
     * The code block doesn't extract from method level so opted to use two reflector to fetch handler and method
    // console.log(
    //   this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
    //     context.getClass(),
    //     context.getHandler(),
    //   ]),
    // );
    */
    let roles: string[] = [];

    // Check if both controllerRoles and methodRoles are defined before combining
    if (controllerRoles !== undefined && methodRoles !== undefined) {
      roles = [...controllerRoles, ...methodRoles];
    } else if (controllerRoles !== undefined) {
      roles = controllerRoles;
    } else if (methodRoles !== undefined) {
      roles = methodRoles;
    }
    console.log(roles);

    if (!roles.length) {
      return true; // No roles specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(user);
    if (
      !user ||
      !user.roles.length ||
      !roles.some((role) =>
        user.roles.some((userRole: string) => userRole === role),
      )
    ) {
      throw new UnauthorizedException('User does not have the required roles');
    }

    return true; // Authentication and role check successful
  }

  /**
   * Handles the result of the authentication.
   * @param {Error} err - The error object.
   * @param {User} user - The user object, if authentication is successful.
   * @param {string} info - Additional information about the authentication process.
   * @returns {User} - The user object if authentication is successful.
   * @throws {RestException} - Throws a `RestException` if authentication fails.
   */
  handleRequest<TUser = User>(
    err: Error | null,
    user: User | null,
    info: string,
  ): TUser {
    if (err || !user) {
      const unauthorizedException = new UnauthorizedException();
      const errorMessage = new ErrorMessage(
        unauthorizedException.getStatus(),
        unauthorizedException.message.concat(':').concat(info), //will remove concat block after discussion regarding if we need info at all
        ErrorDescription.UNAUTHORIZED_USER,
      );
      throw new RestException(errorMessage);
    }

    return user as unknown as TUser; //unsure how  not to use the return type as any here.
  }
}
