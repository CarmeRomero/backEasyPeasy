import { Injectable } from '@nestjs/common';
import { CrearPedidoDto } from './dto/crear-pedido';
import { PrismaService } from '../prisma/prisma.service';
import { identity } from 'rxjs';
import { ModificarPedidoDto } from './dto/modificar-pedido';
import { not } from 'joi';

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

  async modificarPedido(id, pedidoData: CrearPedidoDto) {
    console.log(pedidoData.Detalle_Pedidos);
    const { Detalle_Pedidos, ...pedido } = pedidoData;

    const detalleDelete = await this.prisma.detalle_Pedidos.deleteMany({
      where: {
        id_pedido: id,
      },
    });

    const pedidoInsert = await this.prisma.pedidos.update({
      where: {
        id: id,
      },
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
        Mesas: true,
      },
    });
  }
  async traerUnPedido(id) {
    console.log(id);
    return this.prisma.pedidos.findUnique({
      where: {
        id: id,
      },
      include: {
        Detalle_Pedidos: true,
      },
    });
  }

  // traer pedido de una mesa
  async traerPedidoDeUnaMesa(id) {
    return this.prisma.pedidos.findMany({
      where: {
        id_mesa: id,
        estado: 'ENTREGADO',
        activo: true,
      },
      include: {
        Detalle_Pedidos: {
          select: {
            Articulos: true,
            cantidad: true,
            precio: true,
          },
        },
        Mesas: true,
        Usuarios: true,
      },
    });
  }

  async PEPEPE(id) {
    return this.prisma.pedidos.findMany({
      where: {
        id_mesa: id,
        activo: true,
      },
      include: {
        Detalle_Pedidos: {
          select: {
            Articulos: true,
            cantidad: true,
            precio: true,
          },
        },
        Mesas: true,
      },
    });
  }

  async TraerPedidosDelUsuario(id) {
    const pedido = this.prisma.pedidos.findMany({
      where: {
        id_usuario: id,
        OR: [
          {
            estado: 'PENDIENTE',
          },
          {
            estado: 'ENTREGADO',
          },
          {
            estado: 'CANCELADO',
          },
        ],
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

  async anularPedido(id: number) {
    const anularPedido = await this.prisma.pedidos.update({
      where: {
        id: id,
      },
      data: {
        estado: 'ELIMINADO',
      },
    });
    return anularPedido;
  }

  //REPORTE Mozo

  async pedidosPorUsuarioEntreFecha(fechaDesde, fechaHasta) {
    const asd = await this.prisma.pedidos.groupBy({
      by: ['id_usuario'],
      where: {
        fecha_hora_pedido: {
          gte: fechaDesde,
          lte: fechaHasta,
        },
        OR: [
          {
            estado: 'PENDIENTE',
          },
          {
            estado: 'ENTREGADO',
          },
        ],
      },

      _count: {
        num_pedido: true,
      },
      orderBy: {
        _count: {
          num_pedido: 'desc',
        },
      },
    });
    return asd;
  }

  async articulosMasConsumidos(fechaDesde, fechaHasta) {
    console.log('Entro');
    return await this.prisma.detalle_Pedidos.groupBy({
      by: ['id_articulo'],
      where: {
        Pedido: {
          fecha_hora_pedido: {
            gte: fechaDesde,
            lte: fechaHasta,
          },
        },
      },
      _sum: {
        cantidad: true,
      },
      orderBy: {
        _sum: {
          cantidad: 'desc',
        },
      },
    });
  }
}
