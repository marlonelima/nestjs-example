import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username)

    if (user && user.password === password) {
      const { password, ...userData } = user
      return userData
    }

    return null

  }

  async tokenize(userId: number) {
    const payload = { sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
