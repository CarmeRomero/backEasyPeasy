import { formas_pago, Prisma, Usuarios } from '@prisma/client';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

export class CrearTicketDto {
  id_pedido: number;
  id_usuario: number;
  id_forma_pago: number;
  num_ticket?: number;
  fecha_hora?: Date | string;
  estado_pendiente_pago: boolean;
  total: Prisma.Decimal;
}
