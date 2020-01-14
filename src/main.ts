import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);

  const logger = new Logger('bootstarp');
  logger.log(`now listening on port "${port}"...`);
}
bootstrap();
