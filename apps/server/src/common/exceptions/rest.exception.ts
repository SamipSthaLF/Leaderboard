import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorMessage } from '@common/errors/error.message';
import { ErrorDescription } from '../errors/constants/description.error';

export class RestException extends HttpException {
  constructor(errorMessage: ErrorMessage) {
    super(errorMessage, errorMessage.status);
  }

  /**
   * Throws a RestException for no associated user found.
   *
   * This utility function is used to throw a standardized RestException
   * indicating that no associated user was found. It uses HttpStatus.NOT_ACCEPTABLE
   * and a predefined error message.
   *
   * @throws {RestException} A standardized exception for no associated user scenario.
   */
  static throwNoAssociatedUserException(): never {
    throw new RestException(
      new ErrorMessage(
        HttpStatus.NOT_ACCEPTABLE,
        HttpStatus.NOT_ACCEPTABLE.toLocaleString(),
        ErrorDescription.NO_ASSOCIATED_USER_FOUND,
      ),
    );
  }
}
