import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { actualizarUsuario } from './dto/actualizar-usuario';
import { crearUsuarioDto } from './dto/crear-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async crearUsuario(userData: crearUsuarioDto) {
    console.log(userData);
    const nuevoUsuario = await this.prisma.usuarios.create({ data: userData });
    return nuevoUsuario;
  }

  async traerTodos() {
    return this.prisma.usuarios.findMany();
  }

  async traerUno(id) {
    const usuario = this.prisma.usuarios.findUnique({
      where: {
        id: id,
      },
    });
    // if (!usuario) throw new NotFoundException(`Car with id '${id}' not found`);

    return usuario;
  }

  async actualizarUsuario(id: number, actualizarUsuario: actualizarUsuario) {
    const updateUser = await this.prisma.usuarios.update({
      where: {
        id: id,
      },
      data: {
        ...actualizarUsuario,
        // nombre: actualizarUsuario.nombre,
        // apellido: actualizarUsuario.apellido,
        // password: actualizarUsuario.password,
        // fecha_nacimiento: actualizarUsuario.fecha_nacimiento,
        // telefono: actualizarUsuario.telefono,
        // direccion: actualizarUsuario.direccion,
      },
    });
    return updateUser;
  }
}
