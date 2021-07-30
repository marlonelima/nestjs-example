import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/providers/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email)

    if (user && user.password === password) {
      return user
    }

    return null
  }

  async tokenize(userId: number) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload)
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token)
  }
}
