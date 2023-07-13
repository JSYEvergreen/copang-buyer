import { Buyer } from './buyer';
import { BuyerChangeEmailIn, BuyerChangeNickNameIn, BuyerChangePasswordIn, BuyerLoginIn, BuyerSignUpIn } from './port/buyer.in';
import { OneLoginToken, UserInfo } from '../../auth/domain/login.token';

export interface IBuyerService {
  signUp: (buyerSignIn: BuyerSignUpIn) => Promise<Buyer>;
  login: (loginIn: BuyerLoginIn) => Promise<OneLoginToken>;
  loginByToken: (loginTokenIn: string) => UserInfo;
  refreshLoginByToken: (refreshLoginTokenIn: string) => OneLoginToken;
  checkExistUserId: (userId: string) => Promise<boolean>;
  checkExistUserEmail: (email: string) => Promise<boolean>;
  changePassword: (changePasswordIn: BuyerChangePasswordIn) => Promise<void>;
  changeNickName: (changeNickNameIn: BuyerChangeNickNameIn) => Promise<Buyer>;
  changeEmail: (changeEmailIn: BuyerChangeEmailIn) => Promise<Buyer>;
}
