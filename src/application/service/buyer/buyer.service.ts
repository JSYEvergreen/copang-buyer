import { Inject, Injectable } from '@nestjs/common';
import { IBuyerService } from '../../../domain/service/buyer/buyer.service';
import { BuyerSignUpIn } from '../../../domain/service/buyer/port/buyer.in';
import { IBuyerRepository } from '../../../domain/service/buyer/buyer.repository';
import { BuyerSignUpOut } from '../../../domain/service/buyer/port/buyer.out';
import { IPasswordEncrypt } from '../../../domain/service/auth/encrypt/password.encrypt';

@Injectable()
export class BuyerService implements IBuyerService {
  constructor(
    @Inject('IBuyerRepository') private buyerRepository: IBuyerRepository,
    @Inject('IPasswordEncrypt') private passwordEncrypt: IPasswordEncrypt,
  ) {}
  async signUp(buyerSignIn: BuyerSignUpIn) {
    const phoneNumber = buyerSignIn.phoneNumber.trim().replace('-', '');
    const password = await this.passwordEncrypt.encrypt(buyerSignIn.password);

    const buyerSignUpOut: BuyerSignUpOut = {
      userId: buyerSignIn.userId,
      password: password,
      nickName: buyerSignIn.nickName,
      email: buyerSignIn.email,
      phoneNumber: phoneNumber,
    };

    const createBuyer = await this.buyerRepository.signUp(buyerSignUpOut);

    return createBuyer;
  }
}
