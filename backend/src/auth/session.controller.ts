import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { IsLoggedInGuard } from './guards/logged-in.guard';

@Controller('session')
export class SessionController {
  @Get('login/discord')
  @UseGuards(DiscordAuthGuard)
  loginDiscord() {}

  @Get('login-callback/discord')
  @UseGuards(DiscordAuthGuard)
  loginCallbackDiscord(@Request() req, @Response() res) {
    res.cookie('token', req.user, { signed: true });
    return res.send(req.user);
  }

  @Get('test')
  @UseGuards(IsLoggedInGuard)
  test(@Request() req) {
    return req.user;
  }

  @Get('logout')
  logout(@Response() res) {
    res.cookie('token', Date.now());
    return res.redirect('/');
  }
}
