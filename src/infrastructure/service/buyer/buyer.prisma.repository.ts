import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Buyer as BuyerEntity } from '@prisma/client';
import { BuyerRepositoryWhere, IBuyerRepository } from '../../../domain/service/buyer/buyer.repository';
import { BuyerSignUpOut } from '../../../domain/service/buyer/port/buyer.out';
import { removeUndefinedKey } from '../../../domain/util/json.util';

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
    return await this.prisma.buyer.findFirst({
      where: {
        ...whereCondition,
      },
    });
  }

  async signUp(buyerSignUpOut: BuyerSignUpOut): Promise<BuyerEntity> {
    return await this.prisma.buyer.create({
      data: {
        ...buyerSignUpOut,
      },
    });
  }
}
