import { Injectable, BadRequestException } from '@nestjs/common';
// import { UsuariosService } from '../../src/usuarios/usuarios.service';
// import { PrismaService } from '../../src/prisma/prisma.service';
import { CredencialesDto } from './dto/credencial-usuario';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AutenticacionService {
  constructor(private usuarioService: UsuariosService) {}

  public async obtenerUsuarioAutenticado({
    email,
    //renombramos el atributo del dto como passwordTextoPLano
    password: passwordTextoPlano,
  }: CredencialesDto) {
    try {
      const usuario = await this.usuarioService.traerPorEmail(email);
      this.verificarPassword(passwordTextoPlano, usuario.password);
      usuario.password = undefined;
      return usuario;
    } catch (error) {
      throw new BadRequestException('Por favor, verificá tus credenciales');
    }
  }

  async verificarPassword(passwordTextoPlano: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      passwordTextoPlano,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Por favor, verificá tus credenciales');
    }
  }
}
