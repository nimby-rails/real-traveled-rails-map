import { Controller, Get, Put, Request, Body, UseGuards } from '@nestjs/common';
import { IsLoggedInGuard } from '../auth/guards/logged-in.guard';

@Controller('profile')
@UseGuards(IsLoggedInGuard)
export class ProfileController {
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }

  @Put('username')
  changeUsername(@Request() req, @Body() username: string) {
    console.log(username);
    return username;
  }
}
