import { Token } from '../../../domain/service/auth/token/token';

export class BuyerSignUpRes {
  id: number;
  userId: string;
  nickName: string;
  email: string;
  phoneNumber: string;
  deletedAt: Date | null;
}

export class BuyerLoginRes {
  accessToken: Token;
  refreshToken: Token;
}
