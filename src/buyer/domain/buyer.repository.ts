import { BuyerChangeNickNameOut, BuyerChangePasswordOut, BuyerSignUpOut } from './port/buyer.out';
import { Buyer } from './buyer';

export type BuyerRepositoryWhere = Partial<Buyer>;

export interface IBuyerRepository {
  findOne: (where: BuyerRepositoryWhere) => Promise<Buyer | null>;
  signUp: (buyerSignUpOut: BuyerSignUpOut) => Promise<Buyer>;
  changePassword: (changePasswordOut: BuyerChangePasswordOut) => Promise<Buyer>;
  changeNickName: (changeNickNameOut: BuyerChangeNickNameOut) => Promise<Buyer>;
}
