import { Ubicacion } from '@prisma/client';

export class CrearMesaDto {
  num_mesa: number;
  ubicacion: Ubicacion;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
