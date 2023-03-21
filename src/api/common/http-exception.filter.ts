import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CoPangException } from '../../domain/common/exception';

@Catch(CoPangException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CoPangException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.getMessage();
    const errorCode = exception.getErrorCode();
    console.error(exception);

    const responseBody = {
      isSuccess: false,
      message: message,
      errorCode: errorCode,
    };

    console.log(responseBody);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseBody);
  }
}
