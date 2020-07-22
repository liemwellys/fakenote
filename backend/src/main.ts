import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const option = new DocumentBuilder()
    .setTitle('Fakenote')
    .setDescription('API for Fakenote Demonstration')
    .setVersion('1.0')
    .addTag('fn')
    .build();

  const document = SwaggerModule.createDocument(app, option);

  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('backend');
  await app.listen(3000);
}
bootstrap();
