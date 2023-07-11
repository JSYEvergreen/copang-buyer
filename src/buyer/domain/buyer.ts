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
