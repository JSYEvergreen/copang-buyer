export interface Buyer {
  id: number;
  userId: string;
  password: string;
  name: string;
  nickName: string;
  email: string;
  phoneNumber: string;
  deletedAt: Date | null;
}

export const formattingPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.trim().replace(/-/g, '').replace(/(\s*)/g, '');
};
