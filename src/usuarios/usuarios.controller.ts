import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { actualizarUsuario } from './dto/actualizar-usuario';
import { crearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';
//El controlador es el que escucha la solicitud del cliente y emite una respuesta
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crearUsuario(@Body() userData: crearUsuarioDto) {
    return this.usuariosService.crearUsuario(userData);
  }

  @Get()
  getAllUsuarios() {
    return this.usuariosService.traerTodos();
  }

  @Get(':id')
  getUsuarioById(@Param('id') id) {
    return this.usuariosService.traerUno(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() actualizarUsuario: actualizarUsuario,
  ) {
    return this.usuariosService.actualizarUsuario(+id, actualizarUsuario);
  }

  // @Get(':id')
  // getCarById(@Param('id', ParseIntPipe) id: number) {
  //   // return this.usuariosService.findOneById( id );
  // }

  // @Patch(':id')
  // updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
  //   return body;
  // }

  // @Delete(':id')
  // deleteCar(@Param('id', ParseIntPipe) id: number) {
  //   return {
  //     method: 'delete',
  //     id,
  //   };
  // }
}
