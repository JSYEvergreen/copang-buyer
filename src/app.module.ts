import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BuyerModule } from './buyer/buyer.module';
import { HealthController } from './common/api/health.controller';
import { PrismaService } from './database/infrastructure/prisma.service';
import { LoggerMiddleware } from './common/api/logger.middleware';

@Module({
  imports: [BuyerModule],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
