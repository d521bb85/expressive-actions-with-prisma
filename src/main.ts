import { NestFactory } from '@nestjs/core';
import { AppModule as MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  await app.listen(3000);
}
bootstrap();
