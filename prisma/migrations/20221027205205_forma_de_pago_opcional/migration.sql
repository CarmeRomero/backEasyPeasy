-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_id_forma_pago_fkey";

-- AlterTable
ALTER TABLE "Tickets" ALTER COLUMN "id_forma_pago" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_id_forma_pago_fkey" FOREIGN KEY ("id_forma_pago") REFERENCES "formas_pago"("id") ON DELETE SET NULL ON UPDATE CASCADE;
