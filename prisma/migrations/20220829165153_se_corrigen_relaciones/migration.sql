/*
  Warnings:

  - The primary key for the `Detalle_Pedidos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Precio` on the `Detalle_Pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `sub_total` on the `Detalle_Pedidos` table. All the data in the column will be lost.
  - The `id` column on the `Detalle_Pedidos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Mesas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Mesas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `estado` column on the `Mesas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `estado` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Tickets` table. All the data in the column will be lost.
  - The `id` column on the `Tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Articulo_Menu` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `precio` to the `Detalle_Pedidos` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id_pedido` on the `Detalle_Pedidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_articulo` on the `Detalle_Pedidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `id_usuario` to the `Mesas` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id_mesa` on the `Pedidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_usuario` on the `Pedidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `estado_pendiente_pago` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id_usuario` on the `Tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `IVA` on the `Tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "estadoMesa" AS ENUM ('OCUPADO', 'LIBRE');

-- DropForeignKey
ALTER TABLE "Articulo_Menu" DROP CONSTRAINT "Articulo_Menu_id_categoria_fkey";

-- AlterTable
CREATE SEQUENCE "categorias_id_seq";
ALTER TABLE "Categorias" ALTER COLUMN "id" SET DEFAULT nextval('categorias_id_seq');
ALTER SEQUENCE "categorias_id_seq" OWNED BY "Categorias"."id";

-- AlterTable
ALTER TABLE "Detalle_Pedidos" DROP CONSTRAINT "Detalle_Pedidos_pkey",
DROP COLUMN "Precio",
DROP COLUMN "sub_total",
ADD COLUMN     "precio" DECIMAL(65,30) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "id_pedido",
ADD COLUMN     "id_pedido" INTEGER NOT NULL,
DROP COLUMN "id_articulo",
ADD COLUMN     "id_articulo" INTEGER NOT NULL,
ADD CONSTRAINT "Detalle_Pedidos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Mesas" DROP CONSTRAINT "Mesas_pkey",
ADD COLUMN     "id_usuario" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "estado",
ADD COLUMN     "estado" "estadoMesa" NOT NULL DEFAULT 'LIBRE',
ADD CONSTRAINT "Mesas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Pedidos" DROP COLUMN "id_mesa",
ADD COLUMN     "id_mesa" INTEGER NOT NULL,
DROP COLUMN "id_usuario",
ADD COLUMN     "id_usuario" INTEGER NOT NULL,
ALTER COLUMN "fecha_hora_pedido" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "fecha_hora_entrega" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_pkey",
DROP COLUMN "estado",
DROP COLUMN "total",
ADD COLUMN     "estado_pendiente_pago" BOOLEAN NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "id_usuario",
ADD COLUMN     "id_usuario" INTEGER NOT NULL,
ALTER COLUMN "fecha_hora" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "IVA",
ADD COLUMN     "IVA" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Articulo_Menu";

-- DropEnum
DROP TYPE "eMesa";

-- CreateTable
CREATE TABLE "Articulos_Menu" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "id_categoria" INTEGER,
    "descripcion" TEXT NOT NULL,
    "precio_venta" DECIMAL(65,30) NOT NULL,
    "estado_alta" BOOLEAN NOT NULL,

    CONSTRAINT "Articulos_Menu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_id_mesa_fkey" FOREIGN KEY ("id_mesa") REFERENCES "Mesas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle_Pedidos" ADD CONSTRAINT "Detalle_Pedidos_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle_Pedidos" ADD CONSTRAINT "Detalle_Pedidos_id_articulo_fkey" FOREIGN KEY ("id_articulo") REFERENCES "Articulos_Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesas" ADD CONSTRAINT "Mesas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articulos_Menu" ADD CONSTRAINT "Articulos_Menu_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
