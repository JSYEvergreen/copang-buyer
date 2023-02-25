import { Body, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { BuyerSignUpReq } from './buyer.req.dto';
import { TransformInterceptor } from '../../common/transform.interceptor';
import { IBuyerService } from '../../../domain/service/buyer/buyer.service';
import { BuyerSignUpRes } from './buyer.res.dto';

@Controller()
@UseInterceptors(TransformInterceptor)
export class BuyerController {
  constructor(@Inject('IBuyerService') private buyerService: IBuyerService) {}

  @Post('/buyer/sign-up')
  async signUp(@Body() signUpReq: BuyerSignUpReq) {
    const response = await this.buyerService.signUp(signUpReq);

    const signUpResponse: BuyerSignUpRes = {
      id: response.id,
      userId: response.userId,
      nickName: response.nickName,
      email: response.email,
      phoneNumber: response.phoneNumber,
      deletedAt: response.deletedAt,
    };
    return signUpResponse;
  }
}
