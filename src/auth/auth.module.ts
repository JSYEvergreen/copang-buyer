import { Module } from '@nestjs/common';
import { PasswordBcryptEncrypt } from './infrastructure/password.bcrypt.encrypt';
import { LoginJwtToken } from './infrastructure/login.jwt.token';
import { AuthAuthorizationGuard } from './api/auth.authorization.guard';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AuthAuthorizationGuard,
    {
      provide: 'IPasswordEncrypt',
      useClass: PasswordBcryptEncrypt,
    },
    {
      provide: 'ILoginToken',
      useClass: LoginJwtToken,
    },
  ],
  exports: ['IPasswordEncrypt', 'ILoginToken'],
})
export class AuthModule {}
