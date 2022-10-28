-- DropForeignKey
ALTER TABLE "Mesas" DROP CONSTRAINT "Mesas_id_usuario_fkey";

-- AlterTable
ALTER TABLE "Mesas" ALTER COLUMN "id_usuario" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Mesas" ADD CONSTRAINT "Mesas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
