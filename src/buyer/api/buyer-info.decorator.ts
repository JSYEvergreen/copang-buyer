import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Buyer = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
