# Feira Solidária - Backend

Este projeto é o backend para a aplicação **Feira Solidária**, construído com **Node.js**, **Express**, **Prisma** e **PostgreSQL**.  
Ele gerencia usuários, produtos, doações e autenticação, fornecendo uma API RESTful completa para a plataforma.

---

## Tecnologias Utilizadas

- **Node.js** (Ambiente de Execução)  
- **Express.js** (Framework Web)  
- **Prisma** (ORM)  
- **PostgreSQL** (Base de Dados)  
- **JWT / passport / passport-google-oauth20** (Autenticação)  
- **bcryptjs** (Segurança: hash de senhas)  
- **multer** (Upload de arquivos)  
- **cors / cookie-parser / dotenv** (Utilitários)

---

## Configuração e Instalação

Siga os passos abaixo para configurar e executar o projeto localmente.

### 1. Pré-requisitos

- Node.js (versão 18 ou superior)  
- PostgreSQL  
- Um gestor de pacotes como npm ou Yarn  

### 2. Instale as Dependências

- npm install

### 3. Configure a Base de Dados com o Prisma
#### Gere o cliente Prisma

- npx prisma generate

### 4. Execute as migrações para criar as tabelas

- npx prisma migrate dev --name init
### 5. Inicie o Servidor
#### Para desenvolvimento com hot-reloading:

- npm run dev

#### Para produção:

- npm start

- A API estará rodando em: http://localhost:3001.

Estrutura do Projeto
```
/
├── prisma/
│   ├── schema.prisma   # Estrutura da base de dados
│   └── migrations/
├── src/
│   ├── controllers/    # Lógica de requisição/resposta
│   ├── middleware/     # Middlewares (ex: authMiddleware)
│   ├── models/         # Lógica de acesso à base de dados (Prisma)
│   ├── routes/         # Definição dos endpoints da API
│   ├── services/       # Serviços auxiliares (ex: login com Google)
│   ├── uploads/        # uploads de imagens para produto
│   ├── app.js          # Configuração do Express
│   └── server.js       # Ponto de entrada do servidor
├── .env                # Variáveis de ambiente (NÃO VERSIONADO)
└── package.json
```

## Endpoints Principais da API
### A API é acessada através do prefixo /api.
#### Os recursos principais são:

- /auth: Login normal e via Google, logout e verificação de token

- /usuarios: CRUD para gestão de usuários

- /pessoas: CRUD para perfis dos usuários, com rotas aninhadas para endereços, telefones e doações

- /produtos: CRUD para produtos, com paginação e exclusão de itens do próprio usuário

- /doacoes: Criação de solicitações de troca e atualização de status

- /favoritos: Criação e remoção de favoritos

- /categorias: CRUD para categorias de produtos

# Feira Solidária © 2025