import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ArticulosModule } from './articulos/articulos.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';

// Módulo principal que tiene todo lo que hace referencia a mi app
@Module({
  imports: [UsuariosModule, PrismaModule, ArticulosModule, AutenticacionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
