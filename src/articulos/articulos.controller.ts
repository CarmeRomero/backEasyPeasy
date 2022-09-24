import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { CrearArticuloDto } from './dto/crear-articulo.dto';
import { actualizarArticulo } from './dto/actualizar-articulo.dto';

@Controller('articulos')
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService) {}

  @Post()
  crearArticulo(@Body() userData: CrearArticuloDto) {

    return this.articulosService.crearArticulo(userData);
  }

 @Get()
  traerTodosLosArticulos() {
    return this.articulosService.traerTodos();
  }

  

  @Get(':id')
  getUsuarioById(@Param('id') id) {
    return this.articulosService.traerUno(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() actualizarArticulo: actualizarArticulo,
  ) {
    return this.articulosService.actualizarArticulo(+id, actualizarArticulo);
  }

//   @Put('anular/:id')
//   anularUsuario(@Param('id') id: number) {
//     return this.usuariosService.anularUsuario(+id); 
//   }
}
