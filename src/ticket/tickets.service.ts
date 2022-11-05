import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarTicketDto } from './dto/actualizar-ticket.dto';
import { CrearTicketDto } from './dto/crear-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async crearTicket(userData: CrearTicketDto) {
    console.log(userData);
    const nuevoTicket = await this.prisma.tickets.create({
      data: userData,
    });
    return nuevoTicket;
  }

  async traerTodos() {
    return this.prisma.tickets.findMany({
      include: {
        Pedido: {
          select: {
            Mesas: true,
            num_pedido: true,
            activo: true,
          },
        },
        Usuarios: true,
        formas_pago: true,
      },
    });
  }

  async traerUno(id) {
    const ticket = this.prisma.tickets.findUnique({
      where: {
        id: id,
      },
      include: {
        Pedido: {
          select: {
            Detalle_Pedidos: {
              select: {
                Articulos: true,
                precio: true,
                cantidad: true,
              },
            },
            Mesas: true,
          },
        },
        Usuarios: true,
        formas_pago: true,
      },
    });
    return ticket;
  }

  async actualizarTicket(id: number, actualizarTicket: ActualizarTicketDto) {
    const updateTicket = await this.prisma.tickets.update({
      where: {
        id: id,
      },
      data: {
        ...actualizarTicket,
      },
    });
    return updateTicket;
  }
}
