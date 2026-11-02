import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './common/logger/logger.middleware';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //whitelist: true => Todo lo que te envien de mas que no se utilice en el DTO no lo muevas entre capas
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.use(loggerGlobal);

   const config = new DocumentBuilder()
    .setTitle('Proyecto integrador M4-Back')
    .setDescription('Proyecto desarrolado con NestJS')
    .setVersion('1.0.0')
    .addBearerAuth() //Metodo de autenticación
    .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('api', app, documentFactory);



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
