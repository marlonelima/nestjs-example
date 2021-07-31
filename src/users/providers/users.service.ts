import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'

import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany()
  }

  findOne(email: string) {
    return this.prisma.users.findFirst({ where: { email } })
  }

  findById(id: number) {
    return this.prisma.users.findFirst({ where: { id } })
  }

  async create(dto: CreateUserDto) {
    const isNotUnique = await this.prisma.users.findFirst({
      where: { email: dto.email },
    })

    if (isNotUnique)
      throw new HttpException('E-mail already exists!', HttpStatus.BAD_REQUEST)

    return await this.prisma.users.create({ data: dto })
  }

  async update(id: number, dto: Omit<UpdateUserDto, 'userId'>) {
    try {
      return await this.prisma.users.update({ where: { id }, data: dto })
    } catch (err) {
      throw new BadRequestException()
    }
  }
}
