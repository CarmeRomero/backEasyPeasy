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
import { crearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';
//El controlador es el que escucha la solicitud del cliente y emite una respuesta
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // @Get()
  // getAllUsuarios() {
  //   // return this.usuariosService.findAll()
  // }

  // @Get(':id')
  // getCarById(@Param('id', ParseIntPipe) id: number) {
  //   // return this.usuariosService.findOneById( id );
  // }

  @Post()
  crearUsuario(@Body() userData: crearUsuarioDto) {
    return this.usuariosService.crearUsuario(userData);
  }

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
