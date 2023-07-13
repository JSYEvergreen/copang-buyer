import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const token = req.get('Authorization')?.split(' ')[1] || '';
    const now = Date.now();

    res.on('finish', () => {
      const {
        statusCode,
        locals: { errorCode },
      } = res;

      let message = `${method} ${originalUrl} ${ip} ${userAgent} ${statusCode} ${Date.now() - now}ms`;
      message = errorCode ? message + ` ${errorCode}` : message;
      message = token ? message + ` ${token}` : message;

      this.logger.log(message);
    });
    next();
  }
}
