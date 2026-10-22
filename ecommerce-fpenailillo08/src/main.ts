import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './common/logger/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //whitelist: true => Todo lo que te envien de mas que no se utilice en el DTO no lo muevas entre capas
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))

  app.use(loggerGlobal);

  app.useGlobalPipes(new ValidationPipe())


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
