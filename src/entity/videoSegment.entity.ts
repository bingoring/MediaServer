import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { VideoEntity } from './video.entity';
import { v4 } from 'uuid';

@Entity({ name: 'video_segment' })
export class VideoSegmentEntity {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 64 })
    id = v4();

    @Column({ name: 'page', type: 'int', default: 0})
    page = 0;

    @Column({ name: 'full_path', type: 'varchar', length: 512 })
    fullPath: string;

    @ManyToOne(() => VideoEntity)
    @JoinColumn({ name: 'video_id' })
    video: VideoEntity;
}
