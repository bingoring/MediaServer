import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './filter/error.filter';
import { APIDocumentBuilder } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const globalPrefix = '/api/v1';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalFilters(new ErrorExceptionFilter());

    APIDocumentBuilder.createInstance(app).applyDocument(`${globalPrefix}/docs`);
    await app.listen(process.env.SERVER_PORT);
}
bootstrap();
