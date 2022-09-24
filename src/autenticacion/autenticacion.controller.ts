import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { CredencialesDto } from './dto/credencial-usuario';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import ConfirmEmailDto from './dto/confirmEmail.dto';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('ingreso')
  async ingreso(
    @Body() credencialesDto: CredencialesDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const usuario = await this.autenticacionService.obtenerUsuarioAutenticado(
      credencialesDto,
    );

    const accessTokenCookie =
      await this.autenticacionService.getCookieWithJwtAccessToken(
        usuario.id,
        usuario.rol,
      );

    response.setHeader('Set-Cookie', [accessTokenCookie]);
    return usuario;
  }

  @Post('confirmar-email')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.autenticacionService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.autenticacionService.confirmEmail(email);
  }
}
