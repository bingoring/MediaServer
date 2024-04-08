import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { AbstractGatewayResponse } from "../../dto.abstract";

export class VideoGetQueryDto {
    @ApiProperty()
    @IsString()
    id!: string;

    @ApiProperty()
    @IsNumber()
    startTime!: number;

    @ApiProperty()
    @IsNumber()
    endTime!: number;
}

// export class VideoGetResponseDto extends AbstractGatewayResponse {
//     @ApiProperty({ type: AgentGetResponseValueDto })
//     value!: AgentGetResponseValueDto;
// }
