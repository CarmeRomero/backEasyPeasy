import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearMesaDto } from './dto/crear-mesa.dto';

@Injectable()
export class MesasService {
  constructor(private prisma: PrismaService) {}

  async traerTodas() {
    return this.prisma.mesas.findMany({
      include: {
        Pedidos: true,
        Usuarios: true,
      },
    });
  }

  async traerUna(id) {
    return this.prisma.mesas.findMany({
      where: {
        id: id,
        estado: 'OCUPADO',
      },
      include: {
        Pedidos: true,
        Usuarios: true,
      },
    });
  }
}
