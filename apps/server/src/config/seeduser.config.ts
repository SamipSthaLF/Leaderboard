import { ConfigService } from '@nestjs/config';

const getSeedUser = (
  configService: ConfigService,
): {
  username: string;
} => {
  return {
    username:
      configService.get('SEED_USER_EMAIl') || 'asminshrestha@lftechnology.com',
  };
};

export default getSeedUser;
