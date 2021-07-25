import { Body, Controller, Get, Head, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Post("login")
  async findOne(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password)
    if (!user) throw new HttpException('Invalid user or password!', HttpStatus.UNAUTHORIZED)

    const token = (await this.authService.tokenize(user.id)).access_token

    return { ...user, token }
  }
}
