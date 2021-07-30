import { Body, Controller, Get, Headers, HttpCode, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';

import { UsersService } from './providers/users.service';
import { AuthService } from '../auth/auth.service';

import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { User } from './decorators/user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';


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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    const { userId, ...data } = updateUserDto

    return this.usersService.update(updateUserDto.userId, data)
  }


  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post("login")
  async findOne(@User() user: IUser) {
    return user
  }
}
