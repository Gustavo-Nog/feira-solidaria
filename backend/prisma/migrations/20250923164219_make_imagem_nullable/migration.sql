-- AlterTable
ALTER TABLE "public"."produtos" ALTER COLUMN "imagem_url" DROP NOT NULL,
ALTER COLUMN "data_cadastro" SET DEFAULT CURRENT_TIMESTAMP;
