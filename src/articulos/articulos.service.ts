import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearArticuloDto } from './dto/crear-articulo.dto';
import { actualizarArticulo } from './dto/actualizar-articulo.dto';
import { number } from 'joi';

@Injectable()
export class ArticulosService {
  constructor(private prisma: PrismaService) {}

  async crearArticulo(userData: CrearArticuloDto) {
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
      include: {
        Categorias: true,
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
    const anularArticulo = await this.prisma.articulos_Menu.update({
      where: {
        id: id,
      },
      data: {
        estado_alta: false,
      },
    });
    return anularArticulo;
  }

  async traerMismaCategoria(id_categoria: number) {
    return this.prisma.articulos_Menu.findMany({
      where: {
        id_categoria: id_categoria,
      },
      include: {
        Categorias: true,
      },
    });
  }
}
