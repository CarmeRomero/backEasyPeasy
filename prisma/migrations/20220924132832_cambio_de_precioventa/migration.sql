/*
  Warnings:

  - You are about to alter the column `precio_venta` on the `Articulos_Menu` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Articulos_Menu" ALTER COLUMN "precio_venta" SET DATA TYPE INTEGER;
