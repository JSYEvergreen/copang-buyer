import { LoginJwtToken } from './login.jwt.token';
import { UserInfo } from '../domain/login.token';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';

describe('Login Token 테스트', () => {
  const sut = new LoginJwtToken();
  const givenUser: UserInfo = {
    id: 1,
    userId: 'copang1234',
  };

  describe('getOne access token 과 refresh token 받아오기 테스트', () => {
    test('주어진 정보로 인한 access token refresh token 발급 완료 ', () => {
      const result = sut.getOne(givenUser);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });

  describe('access token verify 테스트', () => {
    // before token 받아오기
    const userOneLoginToken = sut.getOne(givenUser);
    const accessToken = userOneLoginToken.accessToken.value;

    test('올바른 access token 을 통한 user 정보 받아오기 성공', () => {
      const result = sut.verifyByAccess(accessToken);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('userId');
      expect(result.id).toEqual(givenUser.id);
      expect(result.userId).toEqual(givenUser.userId);
    });

    test('잘못된 access token 을 통한 user 정보 받아오기 실패', () => {
      const failedAccessToken = '1236512512';

      expect(() => sut.verifyByAccess(failedAccessToken)).toThrow(new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR));
    });
  });

  describe('refresh token verify 테스트', () => {
    // before token 받아오기
    const userOneLoginToken = sut.getOne(givenUser);
    const refreshToken = userOneLoginToken.refreshToken.value;

    test('올바른 refresh token 을 통한 user 정보 받아오기 성공', () => {
      const result = sut.verifyByRefresh(refreshToken);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    test('잘못된 refresh token 을 통한 user 정보 받아오기 실패', () => {
      const failedAccessToken = '123651251222';

      expect(() => sut.verifyByRefresh(failedAccessToken)).toThrow(new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR));
    });
  });
});
