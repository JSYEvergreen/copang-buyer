import { Module } from '@nestjs/common';
import { BuyerModule } from './service/buyer/buyer.module';
import { HealthController } from "../api/health.controller";

@Module({
  imports: [BuyerModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
