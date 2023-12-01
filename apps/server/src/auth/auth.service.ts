import { Request } from 'express';

import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthService {
  /**
   * Perform request authentication.
   *
   * @param {Request} req - Express request object.
   * @returns {Promise<string | { message: string, user: any }>} Authentication result.
   */
  requestAuthentication = async (req: Request) => {
    // Check if the request has a valid API key for authentication bypass
    if (req.headers['x-api-key'] == process.env.STATIC_API_TOKEN) {
      return 'Authentication bypass from vyaguta';
    }
    // Check if an authorized user exists in the request
    if (!req.user) {
      return 'No authorized user found';
    }
    // Return user information and a success message

    return {
      message: 'User information from google',
      user: req.user,
    };
  };
}
