import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany()
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.users.create({ data: createUserDto })

    } catch (err) {
      if (err.code === 'P2002') throw new HttpException('E-mail already exists!', HttpStatus.BAD_REQUEST)

      throw new BadRequestException()
    }
  }

  findOne(email: string) {
    return this.prisma.users.findFirst({ where: { email } })
  }
}
