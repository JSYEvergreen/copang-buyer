import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ILoginToken } from '../domain/login.token';

@Injectable()
export class AuthAuthorizationGuard implements CanActivate {
  constructor(@Inject('ILoginToken') private loginToken: ILoginToken) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    request.user = this.loginToken.verifyByAccess(request.get('Authorization').split(' ')[1] ?? '');

    return true;
  }
}
