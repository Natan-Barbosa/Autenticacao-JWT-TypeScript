import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { Role, ROLES_KEY } from 'src/decorators/roles.decorator';
import { Reflector } from '@nestjs/core';

dotenv.config();

interface JwtPayload {
  sub: string;
  email: string;
  userRole: Role[];
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      //Decode And Valid Jwt
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;

      //Verify Controller Role
      const requiredRoles = this.reflector.getAllAndOverride<Role[] | []>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }

      //Verify if user Has Authorization to access route
      return requiredRoles.some((role) => payload.userRole?.includes(role));
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('You Are Not Authorized');
    }
  }

  private extractTokenFromHeader(request: Request): string {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('You Are Not Authorized');
    }
    return token;
  }
}
