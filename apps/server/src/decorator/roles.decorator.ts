/**
 * A decorator function to associate roles with a route or method.
 * @function
 * @name Roles
 * @param {...string} roles - The roles to be associated with the route or method.
 * @returns {Function} - The decorator function.
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
import { SetMetadata } from '@nestjs/common';

/**
 * The key used to store roles metadata.
 * @constant {string}
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator function that sets roles metadata for a route or method.
 * @function
 * @param {...string} roles - The roles to be associated with the route or method.
 * @returns {Function} - The decorator function.
 */
export const Roles = (...roles: string[]): Function =>
  SetMetadata(ROLES_KEY, roles);
