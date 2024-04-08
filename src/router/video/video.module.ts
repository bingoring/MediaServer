import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from '@root/entity/video.entity';
import { VideoSegmentEntity } from '@root/entity/videoSegment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity, VideoSegmentEntity])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
