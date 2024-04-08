import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AbstractHttpError } from './http.filter';
import { AbstractGatewayResponse, HttpStatusCode } from '@root/router/dto.abstract';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
    public catch(exception: Error | AbstractHttpError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof AbstractHttpError) {
            const status = exception.getStatus();
            const responseBody = exception.getResponseBody();

            response.status(status).json(responseBody);
            return;
        }

        if (exception instanceof HttpException) {
            const statusCode = exception.getStatus() as AbstractGatewayResponse['statusCode'];

            const responseBody: AbstractGatewayResponse = {
                statusCode,
                error: {
                    code: this.convertCode(exception.name),
                    message: exception.message,
                },
            };

            console.error(exception)
            response.status(statusCode).json(responseBody);
            return;
        }

        const httpStatus = HttpStatusCode.internalError;

        const code = 'NOT_DEFINED_ERROR';
        const message = exception.message;

        const responseBody: AbstractGatewayResponse = {
            statusCode: httpStatus,
            error: {
                code,
                message,
            },
        };

        console.error(exception);

        response.status(httpStatus).json(responseBody);
    }

    private convertCode(name: string) {
        if (name.includes('_')) {
            return name;
        }

        return name
            .replace(/[A-Z]/g, (v) => `_${v}`)
            .toUpperCase()
            .slice(1);
    }
}
