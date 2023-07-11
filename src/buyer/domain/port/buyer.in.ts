export interface BuyerSignUpIn {
  userId: string;
  password: string;
  name: string;
  nickName: string;
  email: string;
  phoneNumber: string;
}

export interface BuyerLoginIn {
  userId: string;
  password: string;
}

export interface BuyerChangePasswordIn {
  accessToken: string;
  password: string;
}
