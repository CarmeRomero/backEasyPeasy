/*
  Warnings:

  - Added the required column `id_forma_pago` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "id_forma_pago" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "formas_pago" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "formas_pago_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_id_forma_pago_fkey" FOREIGN KEY ("id_forma_pago") REFERENCES "formas_pago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
