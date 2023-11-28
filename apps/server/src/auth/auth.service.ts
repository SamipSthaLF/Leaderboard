import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  requestAuthentication(req: any) {
    if (!req.user) {
      if (req.headers['x-api-key'] == process.env.STATIC_API_TOKEN) {
        return 'Authentication bypass from vyaguta';
      }
      return 'No authorized user found';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
