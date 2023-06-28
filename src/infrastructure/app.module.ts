import { Module } from '@nestjs/common';
import { BuyerModule } from './service/buyer/buyer.module';
import { HealthController } from '../api/health.controller';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [BuyerModule],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
