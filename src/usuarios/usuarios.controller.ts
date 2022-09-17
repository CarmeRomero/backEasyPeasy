import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { actualizarUsuario } from './dto/actualizar-usuario';
import { crearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crearUsuario(@Body() userData: crearUsuarioDto) {
    return this.usuariosService.crearUsuario(userData);
  }

  @Get()
  traerTodosLosUsuarios() {
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
}
