import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VideoModule } from './video/video.module';

@Module({
  imports: [VideoModule],
})
export class RouterModule{}
