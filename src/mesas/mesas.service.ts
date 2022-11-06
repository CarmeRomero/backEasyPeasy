import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarEstado } from './dto/actualizarEstado';
import { CrearMesaDto } from './dto/crear-mesa.dto';
import { ModificarDimensionPosicionDto } from './dto/dimension-posicion-mesa.dto';

@Injectable()
export class MesasService {
  constructor(private prisma: PrismaService) {}

  async traerTodas() {
    return this.prisma.mesas.findMany({
      where: {
        OR: [
          {
            estado: 'LIBRE',
          },
          {
            estado: 'OCUPADO',
          },
        ],
      },
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

  async agregarMesa(mesaDto: CrearMesaDto) {
    const mesa = await this.prisma.mesas.create({
      data: mesaDto,
    });
    return mesa;
  }

  async modificarPosicionMesa(
    modificarDimensionPosicionDto: ModificarDimensionPosicionDto[],
  ) {
    const mesa = modificarDimensionPosicionDto.map(async (mesa) => {
      await this.prisma.mesas.update({
        where: {
          id: mesa.id,
        },
        data: {
          ...mesa,
        },
      });
    });

    // const mesa = await this.prisma.mesas.update({
    //   where: {
    //     id: modificarDimensionPosicionDto.id,
    //   },
    //   data: {
    //     ...modificarDimensionPosicionDto,
    //   },
    // });
    return mesa;
  }

  async modificarEstadoMesa(id: number) {
    const updateEstado = await this.prisma.mesas.update({
      where: {
        id: id,
      },
      data: {
        estado: 'LIBRE',
      },
    });
    return updateEstado;
  }

  async anularMesa(id: number) {
    const anularMesa = await this.prisma.mesas.update({
      where: {
        id: id,
      },
      data: {
        estado: 'INACTIVA',
      },
    });
    return anularMesa;
  }
}
