import { IsEmail, IsNotEmpty } from 'class-validator';

export class BuyerSignUpReq {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  password: string;

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
