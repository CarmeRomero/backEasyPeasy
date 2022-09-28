import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async crearCategoria(userData: CrearCategoriaDto) {
    console.log(userData);
    const nuevoArticulo = await this.prisma.categorias.create({
      data: userData,
    });
    return nuevoArticulo;
  }

  async traerTodos() {
    return this.prisma.categorias.findMany({
      // where: {},
    });
  }
  //HACER UN DELETE
  async eliminarCategoria(id: number) {
    const updateArticulo = await this.prisma.categorias.delete({
      where: {
        id: id,
      },
    });
    return updateArticulo;
  }
}
