import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'

import { UsersService } from './providers/users.service'

import { AuthGuard } from '@nestjs/passport'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'

import { User } from './decorators/user.decorator'
import { Roles } from 'src/auth/decorators/roles.decorator'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ILoggedUser } from './interfaces/loggeduser.interface'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IUser } from './interfaces/user.interface'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get all users',
    description: 'Get a list of all users in database',
  })
  @ApiResponse({ type: IUser, isArray: true, status: 200 })
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @ApiOperation({
    summary: 'Create a new user',
    description: 'Sign up a new user to database',
  })
  @ApiResponse({ type: IUser, status: 201 })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ApiOperation({
    summary: 'Update an user',
    description:
      'Update an user that already exists. Only admin can update an user.',
  })
  @ApiResponse({ type: IUser, status: 200 })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    const { userId, ...data } = updateUserDto

    return this.usersService.update(updateUserDto.userId, data)
  }

  @ApiOperation({
    summary: 'Sign in an user',
    description: 'Verify credentails and get user data and token',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { default: { username: 'string', password: 'string' } },
        },
      },
    },
  })
  @ApiResponse({ type: ILoggedUser, status: 200 })
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  async findOne(@User() user: ILoggedUser) {
    return user
  }
}
