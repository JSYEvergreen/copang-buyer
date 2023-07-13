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

export interface BuyerId {
  id: number;
}

export interface BuyerChangePasswordIn extends BuyerId {
  password: string;
}

export interface BuyerChangeNickNameIn extends BuyerId {
  nickName: string;
}

export interface BuyerChangeEmailIn extends BuyerId {
  email: string;
}

export interface BuyerChangePhoneNumberIn extends BuyerId {
  phoneNumber: string;
}
