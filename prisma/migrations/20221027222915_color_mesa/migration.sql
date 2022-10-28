/*
  Warnings:

  - Added the required column `color` to the `Mesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mesas" ADD COLUMN     "color" TEXT NOT NULL;
