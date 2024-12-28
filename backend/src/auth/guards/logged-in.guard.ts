import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class IsLoggedInGuard extends AuthGuard('cookie') {}
