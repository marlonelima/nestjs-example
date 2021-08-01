import { ApiProperty } from '@nestjs/swagger'

export class IUser {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  created_at: Date

  @ApiProperty()
  updated_at: Date

  @ApiProperty()
  role: 'admin' | 'user'
}
