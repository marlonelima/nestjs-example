import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';
import { PrismaService } from './../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UsersService, PrismaService, AuthService],
  controllers: [UsersController],
  exports: [PrismaService, UsersService]
})
export class UsersModule {}
