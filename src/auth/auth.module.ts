import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      verifyOptions: { algorithms: ['RS256'] },
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '60s', algorithm: "RS256" },
    })
  ],
  providers: [AuthService,],
  exports: [JwtModule]
})
export class AuthModule {}
