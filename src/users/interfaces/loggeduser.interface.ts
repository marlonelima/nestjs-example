import { ApiProperty } from '@nestjs/swagger'

import { IUser } from './user.interface'

export class ILoggedUser extends IUser {
  @ApiProperty()
  token: string
}
