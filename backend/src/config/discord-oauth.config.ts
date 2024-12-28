import { registerAs } from '@nestjs/config';

export interface DiscordOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export default registerAs(
  'discord-oauth',
  () =>
    ({
      clientId: process.env.DISCORD_OAUTH_CLIENT_ID,
      clientSecret: process.env.DISCORD_OAUTH_CLIENT_SECRET,
      redirectUri: process.env.DISCORD_OAUTH_REDIRECT_URI,
    }) as DiscordOAuthConfig,
);
