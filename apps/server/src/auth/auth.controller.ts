import { ApiBearerAuth } from '@nestjs/swagger';
import { Get, Request, Controller, UseGuards } from '@nestjs/common';

import { Request as HttpRequest } from 'express';

import { SkipAuth } from '@decorator/skip-auth.decorator';

import { AuthService } from '@/auth/auth.service';

import { AuthenticationGuard } from '@/auth/guards/google-oauth-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@SkipAuth()
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthenticationGuard)
  authenticationRedirect(@Request() req: HttpRequest) {
    return this.authService.requestAuthentication(req);
  }

  @Get('google/callback')
  @UseGuards(AuthenticationGuard)
  async callbacktest(@Request() req: HttpRequest) {
    return await this.authService.createOrUpdateUser(req);
  }
}
