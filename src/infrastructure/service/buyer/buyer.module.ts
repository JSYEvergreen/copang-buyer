import { Module } from '@nestjs/common';
import { BuyerController } from '../../../api/service/buyer/buyer.controller';
import { BuyerService } from '../../../application/service/buyer/buyer.service';
import { BuyerPrismaRepository } from './buyer.prisma.repository';
import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../../database/repository.module';

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
