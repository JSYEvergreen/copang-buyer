import { Inject, Injectable } from '@nestjs/common';
import { IBuyerService } from '../../../domain/service/buyer/buyer.service';
import { BuyerLoginIn, BuyerSignUpIn } from '../../../domain/service/buyer/port/buyer.in';
import { IBuyerRepository } from '../../../domain/service/buyer/buyer.repository';
import { BuyerSignUpOut } from '../../../domain/service/buyer/port/buyer.out';
import { IPasswordEncrypt } from '../../../domain/service/auth/encrypt/password.encrypt';
import { CoPangException, EXCEPTION_STATUS } from '../../../domain/common/exception';
import { ILoginToken } from '../../../domain/service/auth/token/login.token';

@Injectable()
export class BuyerService implements IBuyerService {
  constructor(
    @Inject('IBuyerRepository') private buyerRepository: IBuyerRepository,
    @Inject('IPasswordEncrypt') private passwordEncrypt: IPasswordEncrypt,
    @Inject('ILoginToken') private loginToken: ILoginToken,
  ) {}
  async signUp(buyerSignIn: BuyerSignUpIn) {
    const password = await this.passwordEncrypt.encrypt(buyerSignIn.password);

    const buyerSignUpOut = new BuyerSignUpOut(
      buyerSignIn.userId,
      password,
      buyerSignIn.name,
      buyerSignIn.nickName,
      buyerSignIn.email,
      buyerSignIn.phoneNumber,
    );
    buyerSignUpOut.regPhoneNumber();

    const createBuyer = await this.buyerRepository.signUp(buyerSignUpOut);

    return createBuyer;
  }

  async login(loginIn: BuyerLoginIn) {
    const buyer = await this.buyerRepository.findOne({ userId: loginIn.userId });
    if (!buyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST);
    }
    if (buyer.deletedAt) {
      throw new CoPangException(EXCEPTION_STATUS.USER_DELETED);
    }

    const isCorrectPassword = await this.passwordEncrypt.compare(loginIn.password, buyer.password);

    if (!isCorrectPassword) {
      throw new CoPangException(EXCEPTION_STATUS.USER_PASSWORD_NOT_MATCH);
    }

    const oneLoginToken = this.loginToken.getOne({ id: buyer.id, userId: buyer.userId });

    return oneLoginToken;
  }

  loginByToken(loginTokenIn: string) {
    return this.loginToken.verifyByAccess(loginTokenIn);
  }

  refreshLoginByToken(refreshLoginTokenIn: string) {
    return this.loginToken.verifyByRefresh(refreshLoginTokenIn);
  }

  async checkExistUserId(userId: string) {
    const existBuyer = await this.buyerRepository.findOne({ userId: userId });
    if (existBuyer) {
      return true;
    }
    return false;
  }

  async checkExistUserEmail(email: string) {
    const existBuyer = await this.buyerRepository.findOne({ email: email });
    if (existBuyer) {
      return true;
    }
    return false;
  }
}
