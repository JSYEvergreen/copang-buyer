import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { Buyer as BuyerEntity } from '@prisma/client';
import { BuyerRepositoryWhere, IBuyerRepository } from '../domain/buyer.repository';
import { BuyerSignUpOut } from '../domain/port/buyer.out';
import { removeUndefinedKey } from '../../util/json.util';

@Injectable()
export class BuyerPrismaRepository implements IBuyerRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(where: BuyerRepositoryWhere): Promise<BuyerEntity | null> {
    const whereCondition = removeUndefinedKey({
      id: where.id,
      userId: where.userId,
      name: where.name,
      nickName: where.nickName,
      email: where.email,
      phoneNumber: where.phoneNumber,
      deletedAt: null,
    });
    return this.prisma.buyer.findFirst({
      where: {
        ...whereCondition,
      },
    });
  }

  async signUp(buyerSignUpOut: BuyerSignUpOut): Promise<BuyerEntity> {
    return this.prisma.buyer.create({
      data: {
        ...buyerSignUpOut,
      },
    });
  }
}
