/*
  Warnings:

  - You are about to drop the column `IVA` on the `Tickets` table. All the data in the column will be lost.
  - Added the required column `total` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "tickets_num_ticket_seq";
ALTER TABLE "Tickets" DROP COLUMN "IVA",
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "num_ticket" SET DEFAULT nextval('tickets_num_ticket_seq');
ALTER SEQUENCE "tickets_num_ticket_seq" OWNED BY "Tickets"."num_ticket";
