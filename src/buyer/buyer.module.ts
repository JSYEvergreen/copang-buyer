import { Module } from '@nestjs/common';
import { BuyerController } from './api/buyer.controller';
import { BuyerService } from './application/buyer.service';
import { BuyerPrismaRepository } from './infrastructure/buyer.prisma.repository';
import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../database/repository.module';

@Module({
  imports: [AuthModule, RepositoryModule],
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
  ],
})
export class BuyerModule {}
