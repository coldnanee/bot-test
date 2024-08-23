import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get('SERVER_PORT');

  await app.listen(PORT);
  console.log(`App is starting: http://localhost:${PORT}`);
}
bootstrap();
