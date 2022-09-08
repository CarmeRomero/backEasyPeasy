import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { crearUsuarioDto } from './dto/crear-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async crearUsuario(userData: crearUsuarioDto) {
    console.log(userData);
    const nuevoUsuario = await this.prisma.usuarios.create({ data: userData });
    return nuevoUsuario;
  }
}
