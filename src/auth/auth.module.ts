import { Module } from '@nestjs/common';
import { PasswordBcryptEncrypt } from './infrastructure/password.bcrypt.encrypt';
import { LoginJwtToken } from './infrastructure/login.jwt.token';

@Module({
  imports: [],
  controllers: [],
  providers: [
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
