-- CreateEnum
CREATE TYPE "public"."Genero" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."StatusTroca" AS ENUM ('PENDENTE', 'ACEITA', 'RECUSADA', 'FINALIZADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."TipoQualidade" AS ENUM ('NOVO', 'SEMINOVO', 'USADO');

-- CreateEnum
CREATE TYPE "public"."TipoStatus" AS ENUM ('DISPONIVEL', 'EM_NEGOCIACAO', 'DOADO');

-- CreateEnum
CREATE TYPE "public"."TipoTelefone" AS ENUM ('CELULAR', 'FIXO', 'COMERCIAL');

-- CreateEnum
CREATE TYPE "public"."TipoUsuario" AS ENUM ('ADMIN', 'COMUM');

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "tipo" "public"."TipoUsuario" NOT NULL,
    "nome_usuario" VARCHAR(50) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pessoas" (
    "id_pessoa" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "data_nascimento" DATE,
    "genero" "public"."Genero",
    "cpf" VARCHAR(14),
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id_pessoa")
);

-- CreateTable
CREATE TABLE "public"."acoesadministrativas" (
    "id_acao_admin" SERIAL NOT NULL,
    "descricao" TEXT,
    "data" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "acoesadministrativas_pkey" PRIMARY KEY ("id_acao_admin")
);

-- CreateTable
CREATE TABLE "public"."enderecos" (
    "id_endereco" SERIAL NOT NULL,
    "cep" VARCHAR(10),
    "uf" CHAR(2),
    "cidade" VARCHAR(50),
    "bairro" VARCHAR(50),
    "logradouro" VARCHAR(100),
    "numero_residencia" VARCHAR(10),

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id_endereco")
);

-- CreateTable
CREATE TABLE "public"."pessoa_endereco" (
    "id_pessoa_endereco" SERIAL NOT NULL,
    "pessoa_id" INTEGER NOT NULL,
    "endereco_id" INTEGER NOT NULL,

    CONSTRAINT "pessoa_endereco_pkey" PRIMARY KEY ("id_pessoa_endereco")
);

-- CreateTable
CREATE TABLE "public"."telefones" (
    "id_telefone" SERIAL NOT NULL,
    "numero" VARCHAR(15) NOT NULL,
    "tipo" "public"."TipoTelefone" NOT NULL,
    "pessoa_id" INTEGER,

    CONSTRAINT "telefones_pkey" PRIMARY KEY ("id_telefone")
);

-- CreateTable
CREATE TABLE "public"."categorias" (
    "id_categoria" SERIAL NOT NULL,
    "nome_categoria" VARCHAR(50) NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "public"."produtos" (
    "id_produto" SERIAL NOT NULL,
    "nome_produto" VARCHAR(50) NOT NULL,
    "descricao" TEXT NOT NULL,
    "qualidade" "public"."TipoQualidade",
    "imagem_url" TEXT NOT NULL,
    "status" "public"."TipoStatus",
    "data_cadastro" DATE,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "categoria" INTEGER NOT NULL,
    "pessoa_id" INTEGER,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "public"."doacoes" (
    "id_doacao" SERIAL NOT NULL,
    "data_solicitacao" DATE,
    "data_entrega" TIMESTAMP(0),
    "avaliacao_receptor" SMALLINT,
    "avaliacao_doador" SMALLINT,
    "status" "public"."StatusTroca" NOT NULL,
    "receptor_id" INTEGER,
    "doador_id" INTEGER,
    "produto_id" INTEGER NOT NULL,

    CONSTRAINT "doacoes_pkey" PRIMARY KEY ("id_doacao")
);

-- CreateTable
CREATE TABLE "public"."mensagens" (
    "id_mensagem" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_envio" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "lida" BOOLEAN DEFAULT false,
    "troca_id" INTEGER NOT NULL,
    "remetente_id" INTEGER NOT NULL,
    "destinatario_id" INTEGER NOT NULL,

    CONSTRAINT "mensagens_pkey" PRIMARY KEY ("id_mensagem")
);

-- CreateTable
CREATE TABLE "public"."favoritos" (
    "id_favorito" SERIAL NOT NULL,
    "data_adicao" DATE,
    "pessoa_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("id_favorito")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_nome_usuario_key" ON "public"."usuarios"("nome_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_usuario_id_key" ON "public"."pessoas"("usuario_id");

-- AddForeignKey
ALTER TABLE "public"."pessoas" ADD CONSTRAINT "pessoas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."acoesadministrativas" ADD CONSTRAINT "acoesadministrativas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pessoa_endereco" ADD CONSTRAINT "fk_pessoa" FOREIGN KEY ("pessoa_id") REFERENCES "public"."pessoas"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pessoa_endereco" ADD CONSTRAINT "fk_endereco" FOREIGN KEY ("endereco_id") REFERENCES "public"."enderecos"("id_endereco") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."telefones" ADD CONSTRAINT "telefones_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "public"."pessoas"("id_pessoa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produtos" ADD CONSTRAINT "fk_produto_categoria" FOREIGN KEY ("categoria") REFERENCES "public"."categorias"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produtos" ADD CONSTRAINT "produtos_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "public"."pessoas"("id_pessoa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."doacoes" ADD CONSTRAINT "doacoes_receptor_id_fkey" FOREIGN KEY ("receptor_id") REFERENCES "public"."pessoas"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."doacoes" ADD CONSTRAINT "doacoes_doador_id_fkey" FOREIGN KEY ("doador_id") REFERENCES "public"."pessoas"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."doacoes" ADD CONSTRAINT "doacoes_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "public"."produtos"("id_produto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mensagens" ADD CONSTRAINT "trocas_pessoa_id_fkey" FOREIGN KEY ("troca_id") REFERENCES "public"."doacoes"("id_doacao") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mensagens" ADD CONSTRAINT "mensagens_remetente_id_fkey" FOREIGN KEY ("remetente_id") REFERENCES "public"."pessoas"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mensagens" ADD CONSTRAINT "mensagens_destinatario_id_fkey" FOREIGN KEY ("destinatario_id") REFERENCES "public"."pessoas"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favoritos" ADD CONSTRAINT "favoritos_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "public"."pessoas"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favoritos" ADD CONSTRAINT "favoritos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "public"."produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;
