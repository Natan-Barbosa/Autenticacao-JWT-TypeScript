import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(dto: AuthDto) {
    const user = this.usersService.findOne(dto.email);
    if (user.password != dto.password) {
      throw new BadRequestException(
        'Invalid Credentials, Verify Password Or UserName',
      );
    }
    const payload = {
      sub: user.userId,
      email: user.email,
      userRole: user.userRole,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
