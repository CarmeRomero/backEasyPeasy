import { Rol } from '@prisma/client';
interface TokenPayload {
  id: number;
  rol: Rol;
}

export default TokenPayload;
