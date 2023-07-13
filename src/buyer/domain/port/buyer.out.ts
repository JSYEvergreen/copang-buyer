export interface BuyerSignUpOut {
  userId: string;
  password: string;
  name: string;
  nickName: string;
  email: string;
  phoneNumber: string;
}

export interface BuyerChangePasswordOut {
  id: number;
  password: string;
}

export interface BuyerChangeNickNameOut {
  id: number;
  nickName: string;
}
