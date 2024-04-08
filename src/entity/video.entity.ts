import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity({ name: 'video' })
export class VideoEntity {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 64 })
    id = v4();

    @Column({ name: 'name', type: 'varchar', length: 64 })
    name!: string;

    @Column({ name: 'extension', type: 'varchar', length: 8 })
    extension!: string;

    @Column({ name: 'mime_type', type: 'varchar', length: 32 })
    mimeType!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: string;
}
