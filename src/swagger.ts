import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class APIDocumentBuilder {
    private readonly app: INestApplication;
    constructor(app: INestApplication) {
        this.app = app;
    }

    private createDocument() {
        const builder = new DocumentBuilder();
        const options = builder
            .setTitle('Seadronix backend test API Document')
            .setDescription('Seadronix backend test API Document.')
            .setVersion('3.0.0')
            .addBearerAuth()
            .build();

        return SwaggerModule.createDocument(this.app, options);
    }

    public applyDocument(path: string) {
        const document = this.createDocument();
        SwaggerModule.setup(path, this.app, document, {
            swaggerOptions: {
                defaultModelsExpandDepth: -1,
            },
        });
    }

    public static createInstance(app: INestApplication) {
        return new APIDocumentBuilder(app);
    }
}
