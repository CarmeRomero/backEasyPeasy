import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async crearArticulo(userData: CrearTicketDto) {
    console.log(userData);
    const nuevoTicket = await this.prisma.tickets.create({
      data: userData,
    });
    return nuevoTicket;
  }

  async traerTodos() {
    return this.prisma.tickets.findMany();
  }

  async traerUno(id) {
    const ticket = this.prisma.tickets.findUnique({
      where: {
        id: id,
      },
    });
    return ticket;
  }
}
