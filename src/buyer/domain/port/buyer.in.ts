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

export interface BuyerAccessToken {
  accessToken: string;
}

export interface BuyerChangePasswordIn extends BuyerAccessToken {
  password: string;
}

export interface BuyerChangeNickNameIn extends BuyerAccessToken {
  nickName: string;
}

export interface BuyerChangeEmailIn extends BuyerAccessToken {
  email: string;
}
