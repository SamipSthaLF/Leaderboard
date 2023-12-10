/**
 * Represents an error message with detailed information.
 * @class
 */
export class ErrorMessage {
  /**
   * Creates an instance of ErrorMessage.
   * @constructor
   * @param {number} status - The HTTP status code associated with the error.
   * @param {string} message - The error message.
   * @param {{ code: string, description: string }} error - The error details including a code and description.
   */
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly error: {
      code: string;
      description: string;
    },
  ) {}
}
