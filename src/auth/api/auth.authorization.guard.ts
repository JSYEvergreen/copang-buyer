import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ILoginToken } from '../domain/login.token';
import { Request } from 'express';

@Injectable()
export class AuthAuthorizationGuard implements CanActivate {
  constructor(@Inject('ILoginToken') private loginToken: ILoginToken) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    this.loginToken.verifyByAccess(request.get('Authorization').split(' ')[1] ?? '');

    return true;
  }
}
