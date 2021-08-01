import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Your name cannot be empty!' })
  name: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @MinLength(8, { message: 'Your password is too short!' })
  @IsNotEmpty({ message: 'Your password cannot be empty!' })
  password: string

  @ApiProperty()
  @Optional()
  role: string
}
