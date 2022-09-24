import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { CredencialesDto } from './dto/credencial-usuario';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('ingreso')
  ingreso(@Body() credencialesDto: CredencialesDto) {
    return this.autenticacionService.obtenerUsuarioAutenticado(credencialesDto);
  }
}
