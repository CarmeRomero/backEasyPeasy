-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'MOZO', 'CAJERO', 'VISITANTE');

-- CreateEnum
CREATE TYPE "estadoPedido" AS ENUM ('PENDIENTE', 'CANCELADO', 'ENTREGADO');

-- CreateEnum
CREATE TYPE "Ubicacion" AS ENUM ('AFUERA', 'ADENTRO');

-- CreateEnum
CREATE TYPE "eMesa" AS ENUM ('OCUPADA', 'LIBRE');

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verificacionEmail" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'VISITANTE',
    "DNI" INTEGER NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "telefono" BIGINT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" SERIAL NOT NULL,
    "id_mesa" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "fecha_hora_pedido" TIMESTAMP(3) NOT NULL,
    "num_pedido" INTEGER NOT NULL,
    "fecha_hora_entrega" TIMESTAMP(3) NOT NULL,
    "observaciones" TEXT NOT NULL,
    "estado" "estadoPedido" NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detalle_Pedidos" (
    "id" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "id_articulo" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "Precio" DECIMAL(65,30) NOT NULL,
    "sub_total" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Detalle_Pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesas" (
    "id" TEXT NOT NULL,
    "num_mesa" INTEGER NOT NULL,
    "ubicacion" "Ubicacion" NOT NULL,
    "estado" "eMesa" NOT NULL DEFAULT 'LIBRE',

    CONSTRAINT "Mesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Articulo_Menu" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "id_categoria" INTEGER,
    "descripcion" TEXT NOT NULL,
    "precio_venta" DECIMAL(65,30) NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "Articulo_Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "num_ticket" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "IVA" TEXT NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- AddForeignKey
ALTER TABLE "Articulo_Menu" ADD CONSTRAINT "Articulo_Menu_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
