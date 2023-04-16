import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BuyerModule } from './service/buyer/buyer.module';
import { HealthController } from '../api/health.controller';
import { LoggerMiddleware } from 'src/infrastructure/common/logger.express.middleware';

@Module({
  imports: [BuyerModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
