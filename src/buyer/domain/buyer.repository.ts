import { BuyerChangePasswordOut, BuyerSignUpOut } from './port/buyer.out';
import { Buyer } from './buyer';

// 이게 되면 where 동적 parameter 틀, convention 생성하기
export type BuyerRepositoryWhere = Partial<Buyer>;

export interface IBuyerRepository {
  findOne: (where: BuyerRepositoryWhere) => Promise<Buyer>;
  signUp: (buyerSignUpOut: BuyerSignUpOut) => Promise<Buyer>;
  changePassword: (changePasswordOut: BuyerChangePasswordOut) => Promise<Buyer>;
}
