import { Optional } from '@nestjs/common'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: 'Your name cannot be empty!' })
  name: string

  @IsEmail()
  email: string

  @MinLength(8, { message: 'Your password is too short!' })
  @IsNotEmpty({ message: 'Your password cannot be empty!' })
  password: string

  @Optional()
  role: string
}
