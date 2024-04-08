import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ValueOfType } from "../util/valueof.util";
import { Type } from "class-transformer";


export const HttpStatusCode = {
    ok: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    internalError: 500,
} as const;
export type HttpStatusCodeType = ValueOfType<typeof HttpStatusCode>;
const httpStatusList = Object.values(HttpStatusCode);

type ResponseCodeType = typeof HttpStatusCode;
type StatusCodeType = ResponseCodeType[keyof ResponseCodeType];
export abstract class AbstractBaseResponse {
    statusCode!: StatusCodeType;
    message?: string;
}

class ResponseErrorType {
    @ApiProperty()
    @IsEnum([])
    code!: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    message?: string;
}

export abstract class AbstractGatewayResponse {
    @ApiProperty({ enum: httpStatusList })
    @IsEnum(httpStatusList)
    statusCode!: AbstractBaseResponse['statusCode'];

    @ApiProperty()
    @Type(() => ResponseErrorType)
    error?: ResponseErrorType;
}

