/*
  Warnings:

  - A unique constraint covering the columns `[googleID]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."usuarios" ADD COLUMN     "googleID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_googleID_key" ON "public"."usuarios"("googleID");
