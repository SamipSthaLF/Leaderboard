import { SetMetadata } from '@nestjs/common';

/**
 * The key used to store roles metadata.
 * @constant {string}
 */
export const ROLES_KEY = 'roles';

/**
 * A decorator function to associate roles with a route or method.
 * @function
 * @name Roles
 * @param {...string} roles - The roles to be associated with the route or method.
 * @returns {MethodDecorator & ClassDecorator} - The method decorator function.
 * @example
 * // Usage in a NestJS controller:
 * \@Controller('example')
 * class ExampleController {
 *   \@Get()
 *   \@Roles('admin', 'user')
 *   getExample(): string {
 *     return 'This route requires admin or user roles.';
 *   }
 * }
 */
export const Roles = (...roles: string[]): ClassDecorator & MethodDecorator =>
  SetMetadata(ROLES_KEY, roles);
