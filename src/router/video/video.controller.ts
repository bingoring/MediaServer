// src/videos/videos.controller.ts
import { Controller, Post, Get, Param, Res, Body, UseInterceptors, UploadedFile, ParseFilePipe, Query, Header } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { VideoGetQueryDto, VideoUploadPostResponseDto } from './dto';
import { Readable } from 'typeorm/platform/PlatformTools';
import { HttpStatusCode } from '../dto.abstract';

@ApiTags('video')
@Controller('/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('video'))
  @ApiResponse({ type: VideoUploadPostResponseDto})
  async post(@UploadedFile(new ParseFilePipe({})) video: Express.Multer.File) {
    const value = await this.videoService.post(video);
    return {
      statusCode: HttpStatusCode.ok,
      value
    };
  }

  @Get()
  @ApiResponse({ type: Readable })
    async get(
    @Query() query: VideoGetQueryDto,
    @Res() res: Response,
  ) {
    const { combinedBuffer, extension, mimeType } = await this.videoService.get(query);
    res.setHeader('Content-Disposition', `attachment; filename="video.${extension}"`);
    res.setHeader('Content-Type', mimeType);
    res.send(combinedBuffer);
  }
}
