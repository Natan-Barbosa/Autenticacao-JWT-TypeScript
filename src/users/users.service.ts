import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from 'src/decorators/roles.decorator';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'teste1@gmail.com',
      password: '12345678',
      userRole: [Role.Admin],
    },
    {
      userId: 2,
      email: 'teste2@gmail.com',
      password: '87654321',
      userRole: [Role.User],
    },
  ];

  public findOne(email: string) {
    const user = this.users.find((user) => user.email == email);

    if (!user) {
      throw new BadRequestException('User Not Found');
    }
    return user;
  }
}
