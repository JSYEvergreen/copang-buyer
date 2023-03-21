import { Module } from '@nestjs/common';
import { BuyerController } from '../../../api/service/buyer/buyer.controller';
import { BuyerService } from '../../../application/service/buyer/buyer.service';
import { BuyerPrismaRepository } from './buyer.prisma.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { PasswordBcryptEncrypt } from '../auth/encrypt/password.bcrypt.encrypt';
import { LoginJwtToken } from '../auth/token/login.jwt.token';

@Module({
  controllers: [BuyerController],
  providers: [
    {
      provide: 'IBuyerService',
      useClass: BuyerService,
    },
    {
      provide: 'IBuyerRepository',
      useClass: BuyerPrismaRepository,
    },
    {
      provide: 'IPasswordEncrypt',
      useClass: PasswordBcryptEncrypt,
    },
    {
      provide: 'ILoginToken',
      useClass: LoginJwtToken,
    },
    PrismaService,
  ],
})
export class BuyerModule {}
