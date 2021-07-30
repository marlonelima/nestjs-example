import { SetMetadata } from '@nestjs/common';

type roles = "admin" | "user"

export const Roles = (...roles: roles[]) => SetMetadata('roles', roles);