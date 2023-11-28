import { AuthService } from './auth.service';
import { AuthenticationGuard } from './guards/google-oauth-guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @UseGuards(AuthenticationGuard)
  async googleAuth(@Request() req: any) {}

  @Get('redirect')
  @UseGuards(AuthenticationGuard)
  authenticationRedirect(@Request() req: any) {
    return this.authService.requestAuthentication(req);
  }

  @Get('google/callback')
  callbacktest() {
    return 'Google Authentication success. Callback url reached';
  }
}
