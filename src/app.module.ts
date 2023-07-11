import { Module } from '@nestjs/common';
import { BuyerModule } from './buyer/buyer.module';
import { HealthController } from './common/api/health.controller';
import { PrismaService } from './database/infrastructure/prisma.service';

@Module({
  imports: [BuyerModule],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
