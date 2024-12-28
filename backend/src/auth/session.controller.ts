import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './guards/discord-auth.guard';

@Controller('session')
export class SessionController {
  @Get('login/discord')
  @UseGuards(DiscordAuthGuard)
  loginDiscord() {}

  @Get('login-callback/discord')
  @UseGuards(DiscordAuthGuard)
  loginCallbackDiscord(@Request() req, @Response() res) {
    res.cookie('token', req.user, { signed: true, httpOnly: true });
    return res.redirect('/dashboard');
  }

  @Get('logout')
  logout(@Response() res) {
    res.cookie('token', Date.now());
    return res.redirect('/');
  }
}
