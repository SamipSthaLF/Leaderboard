import { SetMetadata } from '@nestjs/common';

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
export const SkipAuth = () => SetMetadata('skipAuth', true);
