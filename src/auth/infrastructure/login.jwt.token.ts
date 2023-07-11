import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_EXPIRE_DAY, REFRESH_TOKEN_EXPIRE_DAY, secretJwtKey } from '../../common/domain/definition';
import { ILoginToken, OneLoginToken, UserInfo } from '../domain/login.token';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { addDays } from 'date-fns';
import { JwtPayload, sign, TokenExpiredError, verify } from 'jsonwebtoken';

@Injectable()
export class LoginJwtToken implements ILoginToken {
  private transformUserInfo(payload: JwtPayload): UserInfo {
    return {
      id: payload.id,
      userId: payload.userId,
    };
  }

  getOne(userInfo: UserInfo): OneLoginToken {
    const now = new Date();
    const accessTokenExpire = addDays(now, ACCESS_TOKEN_EXPIRE_DAY);
    const refreshTokenExpire = addDays(now, REFRESH_TOKEN_EXPIRE_DAY);

    const accessToken = sign(userInfo, secretJwtKey, { expiresIn: `${ACCESS_TOKEN_EXPIRE_DAY}d` });
    const refreshToken = sign(userInfo, secretJwtKey, {
      algorithm: 'HS256',
      expiresIn: `${REFRESH_TOKEN_EXPIRE_DAY}d`,
    });

    return {
      accessToken: {
        value: accessToken,
        expiredAt: accessTokenExpire,
      },
      refreshToken: {
        value: refreshToken,
        expiredAt: refreshTokenExpire,
      },
    };
  }

  verifyByAccess(token: string): UserInfo {
    let tokenDecoded: JwtPayload;
    verify(token, secretJwtKey, { complete: true }, function (err, decoded) {
      if (err) {
        if (err instanceof TokenExpiredError) {
          throw new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_EXPIRE);
        }
        throw new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR);
      }
      tokenDecoded = decoded.payload as JwtPayload;
    });

    return this.transformUserInfo(tokenDecoded);
  }

  verifyByRefresh(token: string): OneLoginToken {
    let tokenDecoded: JwtPayload;

    verify(token, secretJwtKey, { complete: true }, function (err, decoded) {
      if (err) {
        if (err instanceof TokenExpiredError) {
          throw new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_EXPIRE);
        }
        throw new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR);
      }
      tokenDecoded = decoded.payload as JwtPayload;
    });

    return this.getOne(this.transformUserInfo(tokenDecoded));
  }
}
