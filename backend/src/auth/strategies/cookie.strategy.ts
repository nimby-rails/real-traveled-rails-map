import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { User, UserInfo } from '../user';
import { AuthConfig } from '../../config/auth.config';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(private configService: ConfigService) {
    const authConfig = configService.get<AuthConfig>('auth');

    super(
      { cookieName: 'token', signed: true },
      function (user: User, done: (err: null, user: User) => void) {
        const fullUser: UserInfo = {
          isAdmin:
            authConfig.adminUsers.find(
              (x) => x.provider === user.platform && x.id === user.id,
            ) !== undefined,
          ...user,
        };

        return done(null, fullUser);
      },
    );
  }
}
