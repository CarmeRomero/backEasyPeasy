/*
  Warnings:

  - Added the required column `estado` to the `formas_pago` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "formas_pago" ADD COLUMN     "estado" BOOLEAN NOT NULL;
