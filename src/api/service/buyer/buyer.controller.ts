import { Body, Headers, Controller, Inject, Get, Post, UseInterceptors, Param } from '@nestjs/common';
import { BuyerLoginReq, BuyerSignUpReq } from './buyer.req.dto';
import { TransformInterceptor } from '../../common/transform.interceptor';
import { HeaderBearerInterceptor } from '../../common/header-bearer.interceptor';
import { IBuyerService } from '../../../domain/service/buyer/buyer.service';
import { BuyerLoginRes, BuyerSignUpRes } from './buyer.res.dto';

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

  @Post('/buyer/login')
  async login(@Body() loginReq: BuyerLoginReq) {
    const response = await this.buyerService.login(loginReq);

    const loginResponse: BuyerLoginRes = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
    return loginResponse;
  }

  @Get('/buyer/login')
  @UseInterceptors(HeaderBearerInterceptor)
  async loginByToken(@Headers('Authorization') bearerToken: string) {
    const response = this.buyerService.loginByToken(bearerToken);

    return response;
  }

  @Get('/buyer/refresh-login')
  @UseInterceptors(HeaderBearerInterceptor)
  async refreshLoginByToken(@Headers('Authorization') bearerToken: string) {
    const response = this.buyerService.refreshLoginByToken(bearerToken);

    return response;
  }

  @Get('/buyer/exist-user-id/:userId')
  async checkExistId(@Param('userId') userId: string) {
    const response = this.buyerService.checkExistUserId(userId);
    return response;
  }

  @Get('/buyer/exist-user-email/:email')
  async checkExistEmail(@Param('email') email: string) {
    const response = this.buyerService.checkExistUserEmail(email);
    return response;
  }
}
