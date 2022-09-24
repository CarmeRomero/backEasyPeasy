import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { UsuariosService } from '../usuarios/usuarios.service';

@Module({
  imports: [UsuariosModule],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, UsuariosService],
})
export class AutenticacionModule {}
