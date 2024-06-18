import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  ValidationError,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.error(exception);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (exception instanceof I18nValidationException) {
      // response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      //   name: 'UNPROCESSABLE_ENTITY_EXCEPTION',
      //   message: exception.errors,
      // });

      const flattenErrors: ValidationError[] = [];
      const messages: string[] = [];
      const getChildren = (errors: ValidationError[] | undefined) => {
        errors?.forEach((error) => {
          if (error.children?.length === 0) return flattenErrors.push(error);
          getChildren(error.children);
        });
      };

      getChildren(exception.errors);

      flattenErrors.forEach(({ constraints }) => {
        if (constraints) {
          Object.keys(constraints).forEach((key) => {
            messages.push(constraints[key]);
          });
        }
      });

      return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: messages,
        name: 'UNPROCESSABLE_ENTITY_EXCEPTION',
      });
    }

    if (typeof exceptionResponse === 'object') {
      const exception = exceptionResponse as any;
      return response.status(status).json({
        message: exception.message,
        name: exception.name ?? exception.error,
      });
    } else {
      return response.status(status).json({
        message: exceptionResponse,
        name: exception.name ?? exception.initName(),
      });
    }
  }
}
