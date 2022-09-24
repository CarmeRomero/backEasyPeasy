import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

// Es el punto de entrada a nuestra app. Se ejecuta al principio del proyecto
// Crea nuestra app de Nest
async function main() {
  const app = await NestFactory.create(AppModule, {
    // El CORS le indica al back que solo escuche los llamados a la bd que proveengan del puerto 3005
    cors: {
      origin: 'http://localhost:3005',
      credentials: true,
    },
    // logger: false,
  });

  app.use(cookieParser());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     // estas 2 propiedades evitan que desde el front se envíe más información de la que tengo y necesito
  //     // y tira error si no viene la data que yo estoy esperando
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );
  await app.listen(3000); // puerto
}
main();
