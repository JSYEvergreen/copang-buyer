import { BuyerSignUpOut } from './buyer.out';

describe('domain buyer.out.ts 테스트', () => {
  describe('BuyerSignUpOut class 테스트', () => {
    test('BuyerSignUpOut class 에서 phone Number가 하이픈 제거된 형태로 성공적으로 반환한 경우', () => {
      const willSignUpBuyer = {
        userId: 'copang',
        password: 'copang1234!',
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '010-1234 5678',
      };

      const result = new BuyerSignUpOut(
        willSignUpBuyer.userId,
        willSignUpBuyer.password,
        willSignUpBuyer.name,
        willSignUpBuyer.nickName,
        willSignUpBuyer.email,
        willSignUpBuyer.phoneNumber,
      );
      result.regPhoneNumber();
      expect(result.phoneNumber).toEqual(expect.not.stringContaining('-'));
    });

    test('BuyerSignUpOut class 에서 phone Number가 띄어쓰기 제거된 형태로 성공적으로 반환한 경우', () => {
      const willSignUpBuyer = {
        userId: 'copang',
        password: 'copang1234!',
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '010 1234 5678',
      };

      const result = new BuyerSignUpOut(
        willSignUpBuyer.userId,
        willSignUpBuyer.password,
        willSignUpBuyer.name,
        willSignUpBuyer.nickName,
        willSignUpBuyer.email,
        willSignUpBuyer.phoneNumber,
      );
      result.regPhoneNumber();
      expect(result.phoneNumber).toEqual(expect.not.stringContaining(' '));
    });
  });
});
