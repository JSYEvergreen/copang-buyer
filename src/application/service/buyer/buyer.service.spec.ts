import { BuyerService } from './buyer.service';
import { IBuyerService } from '../../../domain/service/buyer/buyer.service';
import { IPasswordEncrypt } from '../../../domain/service/auth/encrypt/password.encrypt';
import { IBuyerRepository } from '../../../domain/service/buyer/buyer.repository';
import { Buyer } from '../../../domain/service/buyer/buyer';
import { mock, MockProxy } from 'jest-mock-extended';

describe('Buyer Service test  ', () => {
  const buyerRepository: MockProxy<IBuyerRepository> = mock<IBuyerRepository>();
  const passwordEncrypt: MockProxy<IPasswordEncrypt> = mock<IPasswordEncrypt>();
  const sut: IBuyerService = new BuyerService(buyerRepository, passwordEncrypt); // System Under Test

  // test password And password Encrypt
  const testPassword = 'copang1234!';
  const testEncryptPassword = '$2b$08$4JWdHG8SyP2kI1CusmpYr.zSI7QxWK7k.gl26D.i4IHHANVzqmkHa';

  describe('구매자 회원가입 테스트', () => {
    test('구매자의 회원가입이 phoneNumber 가 표현식에 맞게 표현되며 암호화가 정상적으로 수행되어 성공한 사례', async () => {
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        deletedAt: null,
      };
      const willSignUpBuyer = {
        userId: 'copang',
        password: 'copang1234!',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '010-1234 5678',
      };
      passwordEncrypt.encrypt.calledWith(willSignUpBuyer.password).mockResolvedValue(testEncryptPassword);
      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'signUp').mockResolvedValue(givenBuyer);

      const result = await sut.signUp(willSignUpBuyer);

      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.encrypt).toHaveBeenCalledWith(willSignUpBuyer.password);
      expect(result.phoneNumber).toEqual(expect.not.stringContaining(' '));
      expect(result.phoneNumber).toEqual(expect.not.stringContaining('-'));
      expect(1).toEqual(1);
    });
  });
});
