import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoPangException, EXCEPTION_STATUS } from 'src/domain/common/exception';

export interface Response<T> {
  content: T;
}

@Injectable()
export class HeaderBearerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const headers = ctx.getRequest<Request>().headers;
    const authorization = headers['authorization'] ?? headers['Authorization'];
    let bearerToken = '';
    if (authorization) {
      bearerToken = authorization.split(' ')[1];
    }

    if (!authorization || !bearerToken) {
      throw new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_EMPTY);
    }
    headers['authorization'] = bearerToken;
    return next.handle();
  }
}
