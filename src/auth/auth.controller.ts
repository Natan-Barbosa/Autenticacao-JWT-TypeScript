import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from './auth.guard';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    sub: string;
    email: string;
    userRole: string;
    iat?: number;
    exp?: number;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  public signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Get('/private/profile')
  @UseGuards(AuthGuard)
  public getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @Get('/public/profile')
  public getPublicInfo() {
    return 'This Is A Public Route';
  }
}
