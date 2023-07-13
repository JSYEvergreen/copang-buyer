export class Buyer {
  constructor(
    public id: number,
    public userId: string,
    public password: string,
    public name: string,
    public nickName: string,
    public email: string,
    public phoneNumber: string,
    public deletedAt: Date | null,
  ) {}
}

export const formattingPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.trim().replace(/-/g, '').replace(/(\s*)/g, '');
};
