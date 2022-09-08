import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';

// Módulo principal que tiene todo lo que hace referencia a mi app
@Module({
  imports: [UsuariosModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
