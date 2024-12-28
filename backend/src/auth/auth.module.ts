import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import discordOauthConfig from '../config/discord-oauth.config';
import { DiscordStrategy } from './strategies/discord.strategy';
import { SessionController } from './session.controller';
import { CookieStrategy } from './strategies/cookie.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [discordOauthConfig],
    }),
    PassportModule,
  ],
  controllers: [SessionController],
  providers: [DiscordStrategy, CookieStrategy],
})
export class AuthModule {}
