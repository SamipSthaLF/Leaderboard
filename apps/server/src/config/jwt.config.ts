import { ConfigService } from '@nestjs/config';

const getJwtConfiguration = (
  configService: ConfigService,
): {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
} => {
  return {
    secret: configService.get('JWT_SECRET_KEY') || '',
    signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
  };
};

export default getJwtConfiguration;
