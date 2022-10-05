import { Injectable } from '@nestjs/common';
import { CrearPedidoDto } from './dto/crear-pedido';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  // async crearPedido(userData: CrearPedidoDto) {
  //   const nuevoPedido = await this.prisma.pedidos.create({
  //     data: userData,
  //   });
  //   return nuevoPedido;
  // }
}
