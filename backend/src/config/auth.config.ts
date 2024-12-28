import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  signingSecret: string;
  adminUsers: { provider: string; id: string }[];
}

export default registerAs(
  'auth',
  () =>
    ({
      signingSecret: process.env.AUTH_SIGNING_SECRET,
      adminUsers: process.env.ADMIN_USERS.split(',').map((user) => {
        const [provider, id] = user.split('_');
        return { provider, id };
      }),
    }) as AuthConfig,
);
