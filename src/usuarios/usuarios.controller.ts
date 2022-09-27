import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
    console.log(userData);
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

  @Get(':id')
  async TraerUsuario(@Param('id') id) {
    const usuario = await this.usuariosService.traerUno(+id);
    // usuario.fecha_nacimiento = new Date(usuario.fecha_nacimiento);
    return usuario;
  }

  // @Get(':id')
  // // @UseGuards(JwtAuthenticationGuard)
  // async getUsuarioById(
  //   @Param('id') id,
  //   @Req()
  //   request : Request,
  // ) {
  //   const accessTokenCookie =
  //     this.usuariosService.getCookieWithJwtAccessToken(
  //       request.user.id,
  //       request.user.role,
  //     );
  //   return await this.usuariosService.traerUno(request..id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() actualizarUsuario: actualizarUsuario,
  ) {
    return this.usuariosService.actualizarUsuario(+id, actualizarUsuario);
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
