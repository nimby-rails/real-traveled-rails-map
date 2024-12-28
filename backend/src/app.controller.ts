import { Controller, Get, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './auth/guards/discord-auth.guard';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
