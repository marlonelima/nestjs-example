import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      verifyOptions: { algorithms: ['RS256'] },
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '1d', algorithm: "RS256" },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [JwtModule]
})
export class AuthModule {}
