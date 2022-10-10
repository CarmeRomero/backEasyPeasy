import { estadoPedido, Prisma } from '@prisma/client';

interface Detalle_Pedidos {
  id_articulo: number;
  cantidad: number;
  precio: Prisma.Decimal;
}

export class CrearPedidoDto {
  id_mesa: number;
  id_usuario: number;
  fecha_hora_pedido?: Date;
  num_pedido: number;
  fecha_hora_entrega?: Date;
  observaciones: string;
  estado?: estadoPedido;
  Detalle_Pedidos: Detalle_Pedidos[];
}
