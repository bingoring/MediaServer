import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import { v4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import { resolve } from 'path';
import { VideoGetQueryDto } from './dto';
import { VideoEntity } from '@root/entity/video.entity';
import { VideoSegmentEntity } from '@root/entity/videoSegment.entity';
import { execSync } from 'child_process';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
    @InjectRepository(VideoSegmentEntity)
    private videoSegmentRepository: Repository<VideoSegmentEntity>,
  ) {}

  public async post(videoFile: Express.Multer.File): Promise<string> {
    const videoEntity = this.videoRepository.create({
      id: v4(),
      name: videoFile.originalname,
      extension: videoFile.originalname.split('.').pop(),
      mimeType: videoFile.mimetype,
    });

    setImmediate(async () => {
      const video = await this.videoRepository.save(videoEntity);
      const segments = await this.splitVideo(videoFile);
      await Promise.all(segments.map(segment => this.saveSegment(segment, video)));
    });

    return videoEntity.id;
  }

  private async splitVideo(videoFile: Express.Multer.File,): Promise<string[]> {
    const segments: string[] = [];

    await Promise.all([
      fs.mkdir('./tmp', { recursive: true }),
      fs.mkdir('./storage', { recursive: true })
    ]);

    const dirId = v4();
    const storageDir = `./storage/${dirId}`;
    await fs.mkdir(storageDir);

    const extension = videoFile.originalname.split('.').pop();
    const originFilePath = `./tmp/${dirId}.${extension}`;
    await fs.writeFile(originFilePath, videoFile.buffer);

    await new Promise<void>((resolve, reject) => {
      ffmpeg(originFilePath)
        .outputOptions('-reset_timestamps 1')
        .outputOptions('-sc_threshold 0')
        .outputOptions('-g 5')
        .outputOptions('-f segment')
        .outputOptions('-break_non_keyframes 1')
        .outputOptions('-segment_time 10')
        .on('end', resolve)
        .on('error', reject)
        .save(`${storageDir}/segment(%d).${extension}`);
    });

    const files = await fs.readdir(storageDir);
    for (const file of files) {
      segments.push(`${storageDir}/${file}`);
    }

    return segments;
  }

  private async saveSegment(segmentPath: string, video: VideoEntity): Promise<VideoSegmentEntity> {
    const fullPath = resolve(segmentPath);
    const page = +fullPath.split('(').pop().split(')')[0];
    const videoSegment = this.videoSegmentRepository.create({ video, page,  fullPath });
    return await this.videoSegmentRepository.save(videoSegment);
  }

  public async get({ id, startTime, endTime }: VideoGetQueryDto): Promise<{ combinedBuffer: Buffer, extension: string, mimeType: string; }> {
    const video = await this.videoRepository.findOne({
      where: {
        id
      }
    });
    if (!video) {
      throw new NotFoundException('Video not found.');
    }

    const segmentList = await this.videoSegmentRepository.find({
      where: { video: { id } },
      order: { page: 'ASC' },
    });

    if (segmentList.length === 0) {
      throw new Error('Upload in progress.');
    }

    const startPage = Math.floor(startTime / 10);
    const endPage = Math.floor(endTime / 10);

    const filePathList: string[] = [];
    for (let page = startPage; page <= endPage; page++) {
      const segment = segmentList.find(seg => seg.page === page);
      if (segment) {
        filePathList.push(segment.fullPath);
      }
    }

    const combinedBuffer = await this.concatenateVideos(filePathList, video.extension);

    return {
      combinedBuffer,
      extension: video.extension,
      mimeType: video.mimeType,
    };
  }

  private async concatenateVideos(filePathList: string[], extension: string): Promise<Buffer> {
    const outputFilePath = `./tmp/${v4()}.${extension}`;
    const fileNames = filePathList.map(filePath => `file '${filePath}'`).join('\n');
    const listFilePath = `./tmp/${v4()}.txt`;
    
    await fs.writeFile(listFilePath, fileNames);

    execSync(`ffmpeg -f concat -safe 0 -i "${listFilePath}" -c copy ${outputFilePath}`);
    
    await fs.unlink(listFilePath);
    const combinedBuffer = await fs.readFile(outputFilePath);
    await fs.unlink(outputFilePath);
    return combinedBuffer;
  }
}
