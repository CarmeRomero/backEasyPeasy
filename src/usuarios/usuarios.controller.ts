import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { Rol } from '@prisma/client';
import JwtAuthenticationGuard from '../autenticacion/jwt-authentication.guard';
import { actualizarUsuario } from './dto/actualizar-usuario';
import { crearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async crearUsuario(
    @Body() userData: crearUsuarioDto,
    @Res() response: Response,
  ) {
    const usuarioCreado = await this.usuariosService.crearUsuario(userData);
    await this.mailService.sendVerificationLink(
      usuarioCreado.email,
      usuarioCreado.nombre,
    );
    return response.sendStatus(201);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  traerTodosLosUsuarios() {
    return this.usuariosService.traerTodos();
  }

  @Get('roles')
  traerTodosLosRoles() {
    return this.usuariosService.traerTodosLosRoles();
  }

  @Get('usuario')
  @UseGuards(JwtAuthenticationGuard)
  TraerUsuario(@Req() request) {
    return this.usuariosService.traerUno(request.user.id);
  }

  @Put()
  @UseGuards(JwtAuthenticationGuard)
  update(@Req() request, @Body() actualizarUsuario: actualizarUsuario) {
    return this.usuariosService.actualizarUsuario(
      request.user.id,
      actualizarUsuario,
    );
  }

  @Put('anular/:id')
  anularUsuario(@Param('id') id: number) {
    return this.usuariosService.anularUsuario(+id);
  }

  @Put('rol')
  actualizarRol(@Query('id') id: number, @Query('rol') rol: Rol) {
    return this.usuariosService.actualizarRol(+id, rol);
  }
}
