import { ErrorDescription } from './constants/description.error';

export class ErrorMessage {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly error: {
      code: string;
      description: string;
    },
  ) {}
}
