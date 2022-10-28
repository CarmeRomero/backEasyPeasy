import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CrearMesaDto } from './dto/crear-mesa.dto';

@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}
  //TRAER
  @Get()
  traerTodosLosArticulos() {
    return this.mesasService.traerTodas();
  }
  @Get(':id')
  TraerPedidoUnaMesa(@Param('id') id: number) {
    return this.mesasService.traerUna(+id);
  }

  @Post()
  AgregarMesa(@Body() mesaDto: CrearMesaDto) {
    console.log(mesaDto);
    return this.mesasService.agregarMesa(mesaDto);
  }
}
