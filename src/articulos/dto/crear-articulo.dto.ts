import { Categorias } from '@prisma/client';

export class CrearArticuloDto {
  codigo: string;
  id_categoria?: number;
  descripcion: string;
  precio_venta: number;
  estado_alta: boolean;
}
