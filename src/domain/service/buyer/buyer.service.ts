import { Buyer } from './buyer';
import { BuyerSignUpIn, BuyerLoginIn } from './port/buyer.in';
import { OneLoginToken } from '../auth/token/login.token';

export interface IBuyerService {
  signUp: (buyerSignIn: BuyerSignUpIn) => Promise<Buyer>;
  login: (loginIn: BuyerLoginIn) => Promise<OneLoginToken>;
}
