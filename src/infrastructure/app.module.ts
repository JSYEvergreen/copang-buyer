import { Module } from '@nestjs/common';
import { BuyerModule } from './service/buyer/buyer.module';

@Module({
  imports: [BuyerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
