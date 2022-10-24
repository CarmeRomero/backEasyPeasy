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
  Put,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../autenticacion/jwt-authentication.guard';
import { CrearPedidoDto } from './dto/crear-pedido';
import { ModificarPedidoDto } from './dto/modificar-pedido';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  crearPedido(@Body() userData: CrearPedidoDto) {
    return this.pedidosService.crearPedido(userData);
  }

  @Put(':id')
  modificarPedido(@Param('id') id: number, @Body() data: CrearPedidoDto) {
    return this.pedidosService.modificarPedido(+id, data);
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

  @Put('anular/:id')
  anularUsuario(@Param('id') id: number) {
    return this.pedidosService.anularPedido(+id);
  }
}
