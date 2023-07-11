export const EXCEPTION_STATUS = {
  LOGIN_TOKEN_ERROR: { errorCode: 10001, message: '올바른 토큰이 아닙니다' },
  LOGIN_TOKEN_EXPIRE: { errorCode: 10002, message: '만료된 토큰입니다.' },

  USER_ID_DUPLICATE: { errorCode: 10101, message: '해당 user Id는 이미 존재합니다.' },
  USER_NOT_EXIST: { errorCode: 10102, message: '해당 유저가 존재하지 않습니다.' },
  USER_DELETED: { errorCode: 10103, message: '해당 유저는 삭제되었습니다.' },
  USER_PASSWORD_NOT_MATCH: { errorCode: 10104, message: '유저의 비밀번호가 일치하지 않습니다.' },
  USER_CHANGE_PASSWORD_SAME: { errorCode: 10105, message: '이전 비밀번호와 동일한 비밀번호 입니다.' },

  PAGING_NUM_ERROR: { errorCode: 10201, message: '페이징 넘버 에러' },
  PAGING_SORT_BY_OPTION_ERROR: { errorCode: 10202, message: '존재하지 않는 정렬 옵션' },
  PAGING_ORDER_OPTION_ERROR: { errorCode: 10203, message: 'asc or desc 가 아닙니다' },
};

export class CoPangException extends Error {
  private readonly errorCode: number;
  readonly message: string;

  constructor(exception: { errorCode: number; message: string }) {
    super();
    this.errorCode = exception.errorCode;
    this.message = exception.message;
  }
  getMessage() {
    return this.message;
  }
  getErrorCode() {
    return this.errorCode;
  }
}
