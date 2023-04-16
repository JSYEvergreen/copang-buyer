export class BuyerSignUpOut {
  readonly userId: string;
  readonly password: string;
  readonly name: string;
  readonly nickName: string;
  readonly email: string;
  phoneNumber: string;

  constructor(userId: string, password: string, name: string, nickName: string, email: string, phoneNumber: string) {
    this.userId = userId;
    this.password = password;
    this.name = name;
    this.nickName = nickName;
    this.email = email;
    this.phoneNumber = phoneNumber.trim().replace(/-/g, '').replace(/(\s*)/g, '');
  }
}
