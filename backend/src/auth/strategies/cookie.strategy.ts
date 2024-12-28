import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { User } from '../user';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor() {
    super(
      { cookieName: 'token', signed: true },
      function (user: User, done: (err: null, user: User) => void) {
        return done(null, user);
      },
    );
  }
}
