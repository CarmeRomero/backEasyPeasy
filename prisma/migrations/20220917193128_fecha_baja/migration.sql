/*
  Warnings:

  - You are about to drop the column `estado_alta` on the `Usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "estado_alta",
ADD COLUMN     "fecha_baja" TIMESTAMP(3);

-- DropEnum
DROP TYPE "Estado";
