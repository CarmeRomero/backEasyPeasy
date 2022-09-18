import { Rol } from '@prisma/client';

export class crearUsuarioDto {
  nombre: string;
  apellido: string;
  email: string;
  verificacionEmail?: Date | string | null;
  password: string;
  rol?: Rol;
  DNI: number;
  fecha_nacimiento: Date | string;
  telefono: number;
  direccion: string;
}
