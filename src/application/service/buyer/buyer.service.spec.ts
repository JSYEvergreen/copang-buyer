import { BuyerService } from './buyer.service';
import { IBuyerService } from '../../../domain/service/buyer/buyer.service';
import { IPasswordEncrypt } from '../../../domain/service/auth/encrypt/password.encrypt';
import { IBuyerRepository } from '../../../domain/service/buyer/buyer.repository';
import { Buyer } from '../../../domain/service/buyer/buyer';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ILoginToken, OneLoginToken, UserInfo } from '../../../domain/service/auth/token/login.token';
import { BuyerLoginIn } from '../../../domain/service/buyer/port/buyer.in';
import { CoPangException, EXCEPTION_STATUS } from '../../../domain/common/exception';

describe('Buyer Service test  ', () => {
  const buyerRepository: MockProxy<IBuyerRepository> = mock<IBuyerRepository>();
  const passwordEncrypt: MockProxy<IPasswordEncrypt> = mock<IPasswordEncrypt>();
  const loginToken: MockProxy<ILoginToken> = mock<ILoginToken>();
  const sut: IBuyerService = new BuyerService(buyerRepository, passwordEncrypt, loginToken); // System Under Test

  // test password And password Encrypt
  const testPassword = 'copang1234!';
  const testEncryptPassword = '$2b$08$4JWdHG8SyP2kI1CusmpYr.zSI7QxWK7k.gl26D.i4IHHANVzqmkHa';

  // mock clear
  beforeEach(() => {
    mockReset(buyerRepository);
    mockReset(passwordEncrypt);
    mockReset(loginToken);
  });

  describe('구매자 회원가입 테스트', () => {
    test('구매자의 회원가입이 phoneNumber 가 표현식에 맞게 표현되며 암호화가 정상적으로 수행되어 성공한 사례', async () => {
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        deletedAt: null,
      };
      const willSignUpBuyer = {
        userId: 'copang',
        password: 'copang1234!',
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '010-1234-5678',
      };
      passwordEncrypt.encrypt.calledWith(willSignUpBuyer.password).mockResolvedValue(testEncryptPassword);
      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'signUp').mockResolvedValue(givenBuyer);

      const result = await sut.signUp(willSignUpBuyer);

      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.encrypt).toHaveBeenCalledWith(willSignUpBuyer.password);
      expect(result.phoneNumber).toEqual(expect.not.stringContaining(' '));
      expect(result.phoneNumber).toEqual(expect.not.stringContaining('-'));
    });
  });

  describe('구매자 아이디 패스워드로 토큰을 받아오는 로그인 테스트', () => {
    test('구매자의 아이디, 비밀번호로 로그인 성공 ', async () => {
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        deletedAt: null,
      };

      const givenToken: OneLoginToken = {
        accessToken: {
          value: 'accessToken',
          expiredAt: new Date(),
        },
        refreshToken: {
          value: 'refreshToken',
          expiredAt: new Date(),
        },
      };

      const willLoginBuyer: BuyerLoginIn = {
        userId: 'copang',
        password: testPassword,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);
      passwordEncrypt.compare.calledWith(willLoginBuyer.password, givenBuyer.password).mockResolvedValue(true);
      const loginTokenSpy = jest.spyOn(loginToken, 'getOne').mockReturnValue(givenToken);

      const result = await sut.login(willLoginBuyer);

      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.compare).toHaveBeenCalledWith(willLoginBuyer.password, givenBuyer.password);
      expect(loginTokenSpy).toHaveBeenCalled();
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    test('구매자가 탈퇴된 계정으로 로그인 시도를 하여 실패한 경우', async () => {
      const givenBuyerDeleted: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        deletedAt: new Date(),
      };

      const willLoginBuyer: BuyerLoginIn = {
        userId: 'copang',
        password: testPassword,
      };
      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyerDeleted);

      await expect(async () => await sut.login(willLoginBuyer)).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_DELETED));
      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.compare).not.toHaveBeenCalled();
      expect(loginToken.getOne).not.toHaveBeenCalled();
    });

    test('입력된 구매자의 아이디가 존재하지 않아 실패한 경우', async () => {
      const givenBuyerNotExist = null;

      const willLoginBuyer: BuyerLoginIn = {
        userId: 'copang',
        password: testPassword,
      };
      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyerNotExist);

      await expect(async () => await sut.login(willLoginBuyer)).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST));
      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.compare).not.toHaveBeenCalled();
      expect(loginToken.getOne).not.toHaveBeenCalled();
    });

    test('구매자의 아이디, 비밀번호중 비밀번호가 일치하지 않아 실패 한 경우', async () => {
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        deletedAt: null,
      };

      const givenToken: OneLoginToken = {
        accessToken: {
          value: 'accessToken',
          expiredAt: new Date(),
        },
        refreshToken: {
          value: 'refreshToken',
          expiredAt: new Date(),
        },
      };

      const willLoginBuyer: BuyerLoginIn = {
        userId: 'copang',
        password: testPassword,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);
      passwordEncrypt.compare.calledWith(willLoginBuyer.password, givenBuyer.password).mockResolvedValue(false);

      await expect(async () => await sut.login(willLoginBuyer)).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_PASSWORD_NOT_MATCH));
      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.compare).toHaveBeenCalledWith(willLoginBuyer.password, givenBuyer.password);
      expect(loginToken.getOne).not.toHaveBeenCalled();
    });
  });

  describe('구매자 토큰 로그인 테스트', () => {
    test('구매자가 올바른 토큰을 이용하여 유저 정보 반환에 성공한 경우', async () => {
      const givenToken = 'success_token';
      const willLoginBuyer: UserInfo = {
        id: 1,
        userId: 'copang',
      };

      loginToken.verifyByAccess.calledWith(givenToken).mockReturnValue(willLoginBuyer);

      const result = await sut.loginByToken(givenToken);

      expect(result).toEqual(willLoginBuyer);
      expect(loginToken.verifyByAccess).toHaveBeenCalledWith(givenToken);
    });

    test('구매자가 올바르지 않은 토큰을 이용하여 유저 정보 반환에 실패한 경우', async () => {
      const givenToken = 'failed_token';

      loginToken.verifyByAccess.calledWith(givenToken).mockImplementation(() => {
        throw new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR);
      });

      expect(() => sut.loginByToken(givenToken)).toThrow(new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR));
    });
  });

  describe('구매자 리프래쉬 토큰 리프래쉬 로그인 테스트', () => {
    test('구매자가 올바른 refresh 토큰을 이용하여 새 토큰 정보 받아오기를 성공한 경우', () => {
      const givenTokenIn = 'success_token';

      const givenToken: OneLoginToken = {
        accessToken: {
          value: 'accessToken',
          expiredAt: new Date(),
        },
        refreshToken: {
          value: 'refreshToken',
          expiredAt: new Date(),
        },
      };

      loginToken.verifyByRefresh.calledWith(givenTokenIn).mockReturnValue(givenToken);

      const result = sut.refreshLoginByToken(givenTokenIn);

      expect(result).toEqual(givenToken);
      expect(loginToken.verifyByRefresh).toHaveBeenCalledWith(givenTokenIn);
    });

    test('구매자가 올바르지 않은 토큰을 이용하여 유저 정보 반환에 실패한 경우', () => {
      const givenTokenIn = 'failed_token';

      loginToken.verifyByRefresh.calledWith(givenTokenIn).mockImplementation(() => {
        throw new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR);
      });

      expect(() => sut.refreshLoginByToken(givenTokenIn)).toThrow(new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR));
    });
  });

  describe('구매자 userId가 이미 존재하는 지 확인하는 기능 테스트', () => {
    test('구매자의 userId를 사용하는 유저가 존재 경우', async () => {
      const userId = 'copang';
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        deletedAt: null,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);

      const result = await sut.checkExistUserId(userId);

      expect(result).toEqual(true);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });

    test('구매자의 userId를 사용하는 유저가 존재하지 않는 경우', async () => {
      const userId = 'copang';

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(null);

      const result = await sut.checkExistUserId(userId);

      expect(result).toEqual(false);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });
  });

  describe('구매자 email가 이미 존재하는 지 확인하는 기능 테스트', () => {
    test('구매자의 email를 사용하는 유저가 존재 경우', async () => {
      const email = 'copang@copang.com';
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@copang.com',
        phoneNumber: '01012345678',
        deletedAt: null,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);

      const result = await sut.checkExistUserEmail(email);

      expect(result).toEqual(true);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });

    test('구매자의 email를 사용하는 유저가 존재하지 않는 경우', async () => {
      const email = 'copang';

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(null);

      const result = await sut.checkExistUserEmail(email);

      expect(result).toEqual(false);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });
  });
});
