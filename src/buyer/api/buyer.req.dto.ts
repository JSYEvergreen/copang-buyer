import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { formattingPhoneNumber } from '../domain/buyer';

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
  @Transform(({ value }) => formattingPhoneNumber(value))
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

export class BuyerChangeEmailReq {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class BuyerChangePhoneNumberReq {
  @IsNotEmpty()
  @Transform(({ value }) => formattingPhoneNumber(value))
  phoneNumber: string;
}
