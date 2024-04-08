import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityList } from './entity/entity';
import { RouterModule } from './router/router.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWD,
      database: process.env.DB_TYPE,
      entities: EntityList,
      extra: {
          query_timeout: process.env.DB_QUERY_TIMEOUT,
      },
      synchronize: true,
    }),
    RouterModule,
  ],
})
export class AppModule {}
