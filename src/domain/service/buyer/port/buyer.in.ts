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
