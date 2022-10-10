import { Injectable } from '@nestjs/common';
import { CrearPedidoDto } from './dto/crear-pedido';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async crearPedido(pedidoData: CrearPedidoDto) {
    const { Detalle_Pedidos, ...pedido } = pedidoData;

    const pedidoInsert = await this.prisma.pedidos.create({
      include: {
        Detalle_Pedidos: true,
      },
      data: {
        ...pedido,
        Detalle_Pedidos: {
          create: [...Detalle_Pedidos],
        },
      },
    });

    return pedidoInsert;

    // const nuevoPedido = await this.prisma.pedidos.create({
    //   data: userData,
    // });
    // return nuevoPedido;
  }
}
