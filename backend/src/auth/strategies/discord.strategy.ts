import { Injectable } from '@nestjs/common';
import { Strategy, StrategyOptions, Profile } from 'passport-discord';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-oauth2';

import { DiscordOAuthConfig } from '../../config/discord-oauth.config';
import { User } from '../user';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private configService: ConfigService) {
    const discordOAuthConfig =
      configService.get<DiscordOAuthConfig>('discord-oauth');

    const strategyOptions: Partial<StrategyOptions> = {
      clientID: discordOAuthConfig.clientId,
      clientSecret: discordOAuthConfig.clientSecret,
      callbackURL: discordOAuthConfig.redirectUri,
      scope: ['identify'],
    };

    super(
      strategyOptions,
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: VerifyCallback,
      ) => {
        const user: User = {
          platform: 'Discord',
          id: profile.id,
          username: profile.username,
        };
        return cb(null, user);
      },
    );
  }
}
