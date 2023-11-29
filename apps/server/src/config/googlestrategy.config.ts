import { ConfigService } from '@nestjs/config';

const getGoogleStrategyConfig = (
  configService: ConfigService,
): {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: string[];
} => {
  return {
    clientID: configService.get<string>('GOOGLE_CLIENT_ID') ?? '',
    clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') ?? '',
    callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') ?? '',
    scope: ['email', 'profile'],
  };
};

export default getGoogleStrategyConfig;
