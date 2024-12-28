import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  signingSecret: string;
}

export default registerAs(
  'auth',
  () =>
    ({
      signingSecret: process.env.AUTH_SIGNING_SECRET,
    }) as AuthConfig,
);
