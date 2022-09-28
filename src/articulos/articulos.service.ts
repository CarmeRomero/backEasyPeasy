import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearArticuloDto } from './dto/crear-articulo.dto';
import { actualizarArticulo } from './dto/actualizar-articulo.dto';

@Injectable()
export class ArticulosService {
  constructor(private prisma: PrismaService) {}

  async crearArticulo(userData: CrearArticuloDto) {
    console.log(userData);
    const nuevoArticulo = await this.prisma.articulos_Menu.create({
      data: userData,
    });
    return nuevoArticulo;
  }

  async traerTodos() {
    return this.prisma.articulos_Menu.findMany({
      where: {
        estado_alta: true,
      },
    });
  }

  async traerUno(id) {
    const articulo = this.prisma.articulos_Menu.findUnique({
      where: {
        id: id,
      },
    });
    return articulo;
  }

  async actualizarArticulo(id: number, actualizarArticulo: actualizarArticulo) {
    const updateArticulo = await this.prisma.articulos_Menu.update({
      where: {
        id: id,
      },
      data: {
        ...actualizarArticulo,
      },
    });
    return updateArticulo;
  }

  // ELIMINAR ATRICULO SI HACE FALTA
  async anularArticulo(id: number) {
    const updateArticulo = await this.prisma.articulos_Menu.update({
      where: {
        id: id,
      },
      data: {
        estado_alta: false,
      },
    });
    return updateArticulo;
  }
}
