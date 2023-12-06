import { AuthService } from './auth.service';

import { Request as HttpRequest } from 'express';

import { AuthenticationGuard } from './guards/google-oauth-guard';

import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  async googleAuth(@Request() req: HttpRequest) {}

  @Get('redirect')
  @UseGuards(AuthenticationGuard)
  authenticationRedirect(@Request() req: HttpRequest) {
    if (req.user) {
    }
    return this.authService.requestAuthentication(req);
  }

  @Get('google/callback')
  callbacktest() {
    return 'Google Authentication success. Callback url reached';
  }
}
