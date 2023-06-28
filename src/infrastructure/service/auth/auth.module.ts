import { Module } from '@nestjs/common';
import { PasswordBcryptEncrypt } from './encrypt/password.bcrypt.encrypt';
import { LoginJwtToken } from './token/login.jwt.token';

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
