import { AuthService } from './auth.service';

import { Request as HttpRequest } from 'express';

import { SkipAuth } from 'src/decorator/skip-auth.decorator';

import { AuthenticationGuard } from './guards/google-oauth-guard';

import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
@SkipAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  async googleAuth(@Request() req: HttpRequest) {}

  @Get('redirect')
  @UseGuards(AuthenticationGuard)
  async authenticationRedirect(@Request() req: HttpRequest) {
    return await this.authService.requestAuthentication(req);
  }

  @Get('google/callback')
  @UseGuards(AuthenticationGuard)
  async callbacktest(@Request() req: any) {
    return await this.authService.createOrUpdateUser(req.user);
  }
}
