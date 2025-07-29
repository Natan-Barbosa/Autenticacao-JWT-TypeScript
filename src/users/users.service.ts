import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Teste 1',
      password: '12345678',
    },
    {
      userId: 2,
      username: 'Teste 2',
      password: '87654321',
    },
  ];

  public findOne(userID: number) {
    return this.users.find((user) => user.userId == userID);
  }
}
