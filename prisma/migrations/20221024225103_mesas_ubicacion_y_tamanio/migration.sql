/*
  Warnings:

  - Added the required column `height` to the `Mesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Mesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `Mesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Mesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mesas" ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL,
ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL;
