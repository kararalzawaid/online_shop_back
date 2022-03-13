import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe
} from '@nestjs/common';
import express from 'express';

// import { MongooseExceptionFilter } from '@common/filters/mongoose-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false
      },
      exceptionFactory: (errors: ValidationError[] = []) =>
        new BadRequestException(errors)
    })
  );

  // app.useGlobalFilters(new MongooseExceptionFilter());
  app.use(express.static('files'));

  const options = new DocumentBuilder()
    .setTitle('Online shop Service')
    .setDescription('Online shop Service API')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.SERVER_PORT || 4000;
  console.log(`App is running on port ${port}`);

  await app.listen(port);
};

bootstrap();
