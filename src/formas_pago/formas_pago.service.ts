import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearFormaPagoDto } from './dto/crear-formas_pago.dto';
import {} from './dto/update-formas_pago.dto';

@Injectable()
export class FormasPagoService {
  constructor(private prisma: PrismaService) {}

  async crearFormaDePago(userData: CrearFormaPagoDto) {
    const nuevaFormaPago = await this.prisma.formas_pago.create({
      data: userData,
    });
    return nuevaFormaPago;
  }

  async traerTodos() {
    return this.prisma.formas_pago.findMany({
      where: {
        estado: true,
      },
    });
  }
  //HACER UN DELETE
  async anularFormaPago(id: number) {
    const anularFormaPago = await this.prisma.formas_pago.update({
      where: {
        id: id,
      },
      data: {
        estado: false,
      },
    });
    return anularFormaPago;
  }
}
