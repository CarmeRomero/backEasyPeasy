import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../autenticacion/jwt-authentication.guard';
import { CrearPedidoDto } from './dto/crear-pedido';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  crearPedido(@Body() userData: CrearPedidoDto) {
    return this.pedidosService.crearPedido(userData);
  }
  // @Get()
  // traerTodosLosArticulos() {
  //   return this.pedidosService.traerTodos();
  // }
  //traer pedidos con el id del usuario
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  TraerPedidosDelUsuario(@Req() request) {
    return this.pedidosService.TraerPedidosDelUsuario(request.user.id);
  }

  @Get(':id')
  TraerArticuloById(@Param('id') id: number) {
    return this.pedidosService.traerUnPedido(+id);
  }
}
