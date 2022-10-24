import { estadoPedido, Prisma } from '@prisma/client';

interface Detalle_Actualizar_Pedidos {
  id_pedido: number;
  id_articulo: number;
  cantidad: number;
  precio: Prisma.Decimal;
}

export class ModificarPedidoDto {
  id_mesa: number;
  fecha_hora_pedido?: Date;
  num_pedido: number;
  fecha_hora_entrega?: Date;
  observaciones: string;
  estado?: estadoPedido;
  Detalle_Pedidos: Detalle_Actualizar_Pedidos[];
}
