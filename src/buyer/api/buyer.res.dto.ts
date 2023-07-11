import { Token } from '../../auth/domain/token';

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
