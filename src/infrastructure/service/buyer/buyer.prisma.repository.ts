import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Buyer as BuyerEntity } from '@prisma/client';

@Injectable()
export class BuyerPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: string): Promise<BuyerEntity | null> {
    return await this.prisma.buyer.findUnique({
      where: {
        userId: userId,
      },
    });
  }
}
