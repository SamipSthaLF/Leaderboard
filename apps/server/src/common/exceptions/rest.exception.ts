import { HttpException } from '@nestjs/common';

import { ErrorMessage } from '../errors/error.message';

export class RestException extends HttpException {
  constructor(errorMessage: ErrorMessage) {
    super(errorMessage, errorMessage.status);
  }
}
