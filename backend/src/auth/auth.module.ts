import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { DiscordStrategy } from './strategies/discord.strategy';
import { SessionController } from './session.controller';
import { CookieStrategy } from './strategies/cookie.strategy';
import authConfig from '../config/auth.config';
import discordOauthConfig from '../config/discord-oauth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [discordOauthConfig, authConfig],
    }),
    PassportModule,
  ],
  controllers: [SessionController],
  providers: [DiscordStrategy, CookieStrategy],
})
export class AuthModule {}
