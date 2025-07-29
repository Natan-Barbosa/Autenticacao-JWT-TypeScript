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
import { Role, Roles } from 'src/decorators/roles.decorator';

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
  public getPrivateRoute(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Get('/private/admin')
  public getPrivateAdminRoute() {
    return 'This Is A Admin Route';
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard)
  @Get('/private/user')
  public getPrivateUserRoute() {
    return 'this Is A User Route';
  }

  @Get('/public/profile')
  public getPublicInfo() {
    return 'This Is A Public Route';
  }
}
