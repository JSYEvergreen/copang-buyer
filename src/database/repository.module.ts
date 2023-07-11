import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class RepositoryModule {}
