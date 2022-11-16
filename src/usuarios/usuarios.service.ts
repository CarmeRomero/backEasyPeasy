import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Rol } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { actualizarUsuario } from './dto/actualizar-usuario';
import { crearUsuarioDto } from './dto/crear-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async crearUsuario(userData: crearUsuarioDto) {
    // console.log(userData);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    try {
      const nuevoUsuario = await this.prisma.usuarios.create({
        data: userData,
      });
      return nuevoUsuario;
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new ConflictException('El e-mail ingresado ya existe.');
      }
      throw new InternalServerErrorException(
        'Algo salió mal. Por favor, intentá nuevamente.',
      );
    }
  }

  async traerTodos() {
    return this.prisma.usuarios.findMany({
      where: {
        fecha_baja: null,
      },
    });
  }

  async traerUno(id) {
    const usuario = this.prisma.usuarios.findUnique({
      where: {
        id: id,
      },
    });
    // if (!usuario)
    //   throw new NotFoundException(` El usuario con id: '${id}' no existe`);
    return usuario;
  }

  async traerPorEmail(email: string) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: {
        email: email,
      },
    });
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

  async anularUsuario(id: number) {
    const updateUser = await this.prisma.usuarios.update({
      where: {
        id: id,
      },
      data: {
        fecha_baja: new Date(),
      },
    });
    return updateUser;
  }

  async traerTodosLosRoles() {
    return [Rol];
  }

  async actualizarRol(id: number, rol: Rol) {
    const updateRol = await this.prisma.usuarios.update({
      where: {
        id: id,
      },
      data: {
        rol,
      },
    });
    return updateRol;
  }

  async marcarEmailComoConfirmado(email: string) {
    await this.prisma.usuarios.update({
      where: {
        email,
      },
      data: { verificacionEmail: new Date() },
    });
  }

  async buscarAdministradores() {
    const administradores = await this.prisma.usuarios.findMany({
      where: {
        rol: 'ADMIN',
      },
      select: {
        email: true,
        nombre: true,
      },
    });

    return administradores;
  }

  async cambiarPassword(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await this.prisma.usuarios.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });
    return usuario;
  }

  // NO funcionó pero se deja de prueba
  async asd(fechaDesde, fechaHasta) {
    const asd = await this.prisma.usuarios.findMany({
      where: {
        rol: 'MOZO',
      },

      select: {
        Pedidos: {
          where: {
            fecha_hora_pedido: {
              gte: fechaDesde,
              lte: fechaHasta,
            },
            OR: [
              {
                estado: 'PENDIENTE',
              },
              {
                estado: 'ENTREGADO',
              },
            ],
          },
        },
      },
    });
    return asd;
  }
}
