import { Get, Request, UseGuards, Controller } from '@nestjs/common';

import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Request as HttpRequest } from 'express';

import { SkipAuth } from '@decorator/skip-auth.decorator';

import { AuthService } from '@/auth/auth.service';

import { AuthenticationGuard } from '@/auth/guards/google-oauth-guard';

@ApiTags('Auth')
@Controller('auth')
@SkipAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  async googleAuth() {}

  @Get('redirect')
  @ApiCreatedResponse({
    description: 'Redirected',
  })
  @ApiBadRequestResponse({ description: 'Redirection failed' })
  @UseGuards(AuthenticationGuard)
  authenticationRedirect(@Request() req: HttpRequest) {
    return this.authService.requestAuthentication(req);
  }

  @Get('google/callback')
  @ApiBadRequestResponse({ description: 'Redirection failed' })
  @UseGuards(AuthenticationGuard)
  async callbacktest(@Request() req: HttpRequest) {
    return await this.authService.createOrUpdateUser(req);
  }
}
