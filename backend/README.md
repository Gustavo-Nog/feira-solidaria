# Feira Solidária - Backend

Este projeto é o backend para a aplicação **Feira Solidária**, construído com **Node.js**, **Express**, **Prisma** e **PostgreSQL**.  
Ele gerencia usuários, produtos, doações e autenticação, fornecendo uma API RESTful completa para a plataforma.

---

## Tecnologias Utilizadas

<!-- Tecnologias com favicons/badges -->

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="20" style="vertical-align:middle"/> **Node.js** (Ambiente de Execução)

```bash
# macOS / Linux (com nvm)
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
nvm install --lts

# Windows (PowerShell, winget)
winget install OpenJS.NodeJS.LTS
```

 - <img src="https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white" alt="Express.js" width="110" style="vertical-align:middle"/> **Express.js** (Framework Web)

```bash
npm install express
```

 - <img src="https://img.shields.io/badge/Prisma-2B2B2B?style=flat&logo=prisma&logoColor=white" alt="Prisma" width="90" style="vertical-align:middle"/> **Prisma** (ORM)

```bash
npm install prisma --save-dev
npm install @prisma/client
```

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="20" style="vertical-align:middle"/> **PostgreSQL** (Base de Dados)

```bash
# Ubuntu/Debian
sudo apt update; sudo apt install postgresql postgresql-contrib -y

# macOS (Homebrew)
brew install postgresql

# Windows (winget)
winget install -e --id PostgreSQL.PostgreSQL
```

- <img src="https://img.shields.io/badge/JWT%20%2F%20Passport-auth-blue" alt="Auth" width="20" style="vertical-align:middle"/> **JWT / passport / passport-google-oauth20** (Autenticação)

```bash
npm install jsonwebtoken passport passport-google-oauth20
```

- <img src="https://img.shields.io/badge/bcryptjs-secure-blue" alt="bcryptjs" width="20" style="vertical-align:middle"/> **bcryptjs** (Segurança: hash de senhas)

```bash
npm install bcryptjs
```

- <img src="https://img.shields.io/badge/multer-upload-orange" alt="multer" width="20" style="vertical-align:middle"/> **multer** (Upload de arquivos)

```bash
npm install multer
```

- <img src="https://img.shields.io/badge/cors%20%2F%20cookie--parser%20%2F%20dotenv-utils-lightgrey" alt="utils" width="20" style="vertical-align:middle"/> **cors / cookie-parser / dotenv** (Utilitários)

```bash
npm install cors cookie-parser dotenv
```

 - <img src="https://img.shields.io/badge/Insomnia-5C6B8A?style=flat&logo=insomnia&logoColor=white" alt="Insomnia" width="90" style="vertical-align:middle"/> **Insomnia** (Cliente HTTP usado nos testes)

```bash
# macOS (Homebrew Cask)
brew install --cask insomnia

# Windows (winget)
winget install -e --id Insomnia.Insomnia

# Alternativa: baixe em https://insomnia.rest/
```

---

## Configuração e Instalação

Siga os passos abaixo para configurar e executar o projeto localmente.

### 1. Pré-requisitos

- Node.js (versão 18 ou superior)  
- PostgreSQL  
- Um gestor de pacotes como npm ou Yarn  

### 2. Instale as Dependências
```bash
- npm install
```
### 3. Configure a Base de Dados com o Prisma
#### Gere o cliente Prisma
```bash
- npx prisma generate
```
### 4. Execute as migrações para criar as tabelas
```bash
- npx prisma migrate dev --name init
```
### 5. Inicie o Servidor
#### Para produção:
```bash
cd backend
node src/server.js
```
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