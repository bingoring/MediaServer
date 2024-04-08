import { HttpException } from '@nestjs/common';
import { AbstractBaseResponse, AbstractGatewayResponse } from '@root/router/dto.abstract';

export abstract class AbstractHttpError extends HttpException {
    private readonly responseBody: AbstractGatewayResponse;
    constructor(statusCode: AbstractBaseResponse['statusCode'], code: string, message?: string) {
        super(message ?? code, statusCode);
        this.responseBody = { error: { code, message }, statusCode };
    }

    public getResponseBody() {
        return this.responseBody;
    }
}

export class CustomHttpError extends AbstractHttpError {}
