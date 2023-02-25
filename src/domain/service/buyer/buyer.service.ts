import { Buyer } from './buyer';
import { BuyerSignUpIn } from './port/buyer.in';
export interface IBuyerService {
  signUp: (buyerSignIn: BuyerSignUpIn) => Promise<Buyer>;
}
