import { ApiProperty } from "@nestjs/swagger";
import { AbstractGatewayResponse } from "src/router/dto.abstract";

class VideoUploadPostResponseValueDto {
    @ApiProperty()
    fileId!: string;
}

export class VideoUploadPostResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: VideoUploadPostResponseValueDto })
    value!: VideoUploadPostResponseValueDto;
}
