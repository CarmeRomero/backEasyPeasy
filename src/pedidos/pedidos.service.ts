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
  }

  async traerTodos() {
    return this.prisma.pedidos.findMany({
      include: {
        Detalle_Pedidos: true,
      },
    });
  }

  async TraerPedidosDelUsuario(id) {
    const pedido = this.prisma.pedidos.findMany({
      where: {
        id_usuario: id,
      },
      include: {
        Detalle_Pedidos: true,
        Mesas: true,
      },
    });
    // if (!usuario)
    //   throw new NotFoundException(` El usuario con id: '${id}' no existe`);
    return pedido;
  }
}
