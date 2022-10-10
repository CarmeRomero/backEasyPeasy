import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CrearPedidoDto } from './dto/crear-pedido';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  crearPedido(@Body() userData: CrearPedidoDto) {
    return this.pedidosService.crearPedido(userData);
  }
}
