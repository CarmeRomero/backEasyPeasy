import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CrearCategoriaDto } from './dto/create-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}
  //CREAR
  @Post()
  crearArticulo(@Body() userData: CrearCategoriaDto) {
    return this.categoriasService.crearCategoria(userData);
  }

  //TRAER
  @Get()
  traerTodosLosArticulos() {
    return this.categoriasService.traerTodos();
  }
  //ELIMINAR
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.eliminarCategoria(+id);
  }
}
