-- AlterTable
CREATE SEQUENCE "pedidos_num_pedido_seq";
ALTER TABLE "Pedidos" ALTER COLUMN "num_pedido" SET DEFAULT nextval('pedidos_num_pedido_seq');
ALTER SEQUENCE "pedidos_num_pedido_seq" OWNED BY "Pedidos"."num_pedido";
