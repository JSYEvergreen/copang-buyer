import { Module } from '@nestjs/common';
import { PasswordBcryptEncrypt } from '../../../application/service/auth/encrypt/password.bcrypt.encrypt';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'IPasswordEncryptor',
      useClass: PasswordBcryptEncrypt,
    },
  ],
  exports: [
    {
      provide: 'IPasswordEncryptor',
      useClass: PasswordBcryptEncrypt,
    },
  ],
})
export class AuthModule {}
