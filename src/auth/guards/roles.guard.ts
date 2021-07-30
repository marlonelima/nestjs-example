import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UsersService } from './../../users/providers/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersService) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest()

    const userId = request.user.token_payload.sub

    const userData = await this.usersService.findById(userId)

    const hasPermission = roles.includes(userData.role)

    if (hasPermission) return true

    return false
  }
}
