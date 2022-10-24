import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FormasPagoService } from './formas_pago.service';
import { CrearFormaPagoDto } from './dto/crear-formas_pago.dto';

@Controller('formas-pago')
export class FormasPagoController {
  constructor(private readonly formasPagoService: FormasPagoService) {}
  //CREAR
  @Post()
  crearArticulo(@Body() userData: CrearFormaPagoDto) {
    return this.formasPagoService.crearFormaDePago(userData);
  }

  //TRAER
  @Get()
  traerTodosLosArticulos() {
    return this.formasPagoService.traerTodos();
  }

  @Put('anular/:id')
  anularUsuario(@Param('id') id: number) {
    return this.formasPagoService.anularFormaPago(+id);
  }
}
