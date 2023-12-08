import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@/user/entities/user.entity';

import { ROLES_KEY } from '@decorator/roles.decorator';
import { SKIP_AUTH_KEY } from '@/decorator/skip-auth.decorator';

import { RoleEnum } from '@/common/constants/role.enum';
import { ErrorMessage } from '@common/errors/error.message';
import { RestException } from '@common/exceptions/rest.exception';
import { ErrorDescription } from '@common/errors/constants/description.error';

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
    if (
      this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
    ) {
      return true;
    }

    // Proceed with standard authentication check
    if (!(await super.canActivate(context))) {
      return false;
    }

    // Retrieve roles from controller and method context
    const roles = this.getRoles(context);

    // If no roles are specified, allow access
    if (!roles.length) return true;

    // Get user from request and verify role access
    const userRoles = context.switchToHttp().getRequest().use.roles;
    if (this.hasRequiredRoles(userRoles, roles)) {
      return true;
    }

    throw new UnauthorizedException('User does not have the required roles');
  }

  /**
   * Combines controller and method roles into a single array.
   * @param {ExecutionContext} context - The execution context of the route.
   * @returns {string[]} - The combined roles.
   */
  getRoles(context: ExecutionContext): string[] {
    const controllerRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getClass()],
    );
    //check for controller roles
    const contmethodRollerRoles = this.reflector.getAllAndOverride<string[]>(
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

    // Combine and deduplicate roles
    return [...new Set([...(controllerRoles || []), ...(methodRoles || [])])];
  }

  /**
   * Checks if the user has at least one of the required roles.
   * @param {RoleEnum[]} userRoles - The user object from the request.
   * @param {string[]} roles - The required roles.
   * @returns {boolean} - Whether the user has required roles.
   */
  hasRequiredRoles(userRoles: RoleEnum[], roles: string[]): boolean {
    return userRoles?.some((userRole) => roles.includes(userRole));
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
