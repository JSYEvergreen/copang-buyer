import { IsEmail, IsNotEmpty } from 'class-validator';

export class BuyerSignUpReq {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nickName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;
}

export class BuyerLoginReq {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  password: string;
}

export class BuyerChangePasswordReq {
  @IsNotEmpty()
  password: string;
}

export class BuyerChangeNickNameReq {
  @IsNotEmpty()
  nickName: string;
}
