/*
  Warnings:

  - Added the required column `estado_alta` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('HABILITADO', 'DESHABILITADO', 'PENDIENTE');

-- AlterTable
ALTER TABLE "Usuarios" ADD COLUMN     "estado_alta" "Estado" NOT NULL;
