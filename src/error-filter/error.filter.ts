import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const req = ctx.getRequest();

      const status =
          exception instanceof HttpException
              ? exception.getStatus()
              : HttpStatus.INTERNAL_SERVER_ERROR;

      if (exception instanceof HttpException) {
          Logger.log(`${req.method} ${req.url} - ${exception.message}`, 'ExceptionsFilter');
      } else {
          Logger.error(`${req.method} ${req.url} - ${exception.message}`, undefined, 'ExceptionsFilter');
          console.log(exception);

          // Filter for custom exceptions

          // if (exception['code']) {
          // }
      }

      response.status(status).json({
          statusCode: status,
          message: exception instanceof HttpException
              ? exception.message
              : 'Internal server error'
      });
  }
}