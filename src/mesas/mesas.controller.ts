import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CrearMesaDto } from './dto/crear-mesa.dto';
import { ModificarDimensionPosicionDto } from './dto/dimension-posicion-mesa.dto';
import JwtAuthenticationGuard from '../autenticacion/jwt-authentication.guard';

@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}
  //TRAER
  @Get()
  traerTodasLasMesas() {
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

  @Put('/dimension-posicion')
  ModificarPosicionMesa(
    @Body() modificarDimensionPosicionDto: ModificarDimensionPosicionDto[],
  ) {
    return this.mesasService.modificarPosicionMesa(
      modificarDimensionPosicionDto,
    );
  }

  @Put('actualizarEstadoLibre/:id')
  actualizarEstadoLibre(@Param('id') id: number) {
    return this.mesasService.modificarEstadoMesaLibre(+id);
  }

  @Put('actualizarEstadoOcupado/:id')
  @UseGuards(JwtAuthenticationGuard)
  actualizarEstadoOcupado(@Param('id') id: number, @Req() request) {
    return this.mesasService.modificarEstadoMesaOcupado(+id, request.user.id);
  }
  @Put('anular/:id')
  anularMesa(@Param('id') id: number) {
    return this.mesasService.anularMesa(+id);
  }
}
