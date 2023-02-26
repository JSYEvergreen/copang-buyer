import { Module } from '@nestjs/common';
import { PasswordBcryptEncrypt } from '../../../application/service/auth/encrypt/password.bcrypt.encrypt';
import { LoginJwtToken } from '../../../application/service/auth/token/login.jwt.token';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'IPasswordEncryptor',
      useClass: PasswordBcryptEncrypt,
    },
    {
      provide: 'ILoginToken',
      useClass: LoginJwtToken,
    },
  ],
  exports: [
    {
      provide: 'IPasswordEncryptor',
      useClass: PasswordBcryptEncrypt,
    },
    {
      provide: 'ILoginToken',
      useClass: LoginJwtToken,
    },
  ],
})
export class AuthModule {}
