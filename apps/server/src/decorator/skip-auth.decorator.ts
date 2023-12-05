/**
 * A decorator function to mark a route or method to skip authentication.
 * @function
 * @name SkipAuth
 * @returns {Function} - The decorator function.
 * @example
 * // Usage in a NestJS controller:
 * \@Controller('example')
 * class ExampleController {
 *   \@Get()
 *   \@SkipAuth()
 *   getExample(): string {
 *     return 'This route skips authentication.';
 *   }
 * }
 */
import { SetMetadata } from '@nestjs/common';

/**
 * The key used to store skip-auth metadata.
 * @constant {string}
 */
export const SKIP_AUTH_KEY = 'skipAuth';

/**
 * A decorator function to mark a route or method to skip authentication.
 * @function
 * @name SkipAuth
 * @returns {Function} - The decorator function.
 * @example
 * // Usage in a NestJS controller:
 * \@Controller('example')
 * class ExampleController {
 *   \@Get()
 *   \@SkipAuth()
 *   getExample(): string {
 *     return 'This route skips authentication.';
 *   }
 * }
 */
export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);
