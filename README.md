# 📚 Library API

API REST para gerenciamento de livros, com autenticação, autorização por roles e funcionalidades de wishlist e leitura.

Projeto desenvolvido com foco em **boas práticas de backend**, separação clara de responsabilidades, segurança e padrões utilizados em ambientes profissionais.

---

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL (Neon)
- JWT (autenticação)
- Zod (validação de dados)
- Helmet (segurança HTTP)
- CORS
- Express Rate Limit
- Biome (lint e formatação)

---

## 📦 Funcionalidades

### 🔐 Auth
- Registro de conta (`USER` ou `AUTHOR`)
- Login com JWT
- Rate limit aplicado em login e registro

### 👤 Accounts
- Obter dados da conta logada (`/accounts/me`)
- Resumo da conta (quantidade de wishlist e livros lidos)

### 📘 Books
- Criar livro (somente `AUTHOR`)
- Listar livros com paginação
- Listar livros criados pelo author logado

### ⭐ Wishlist (USER)
- Adicionar livro à wishlist
- Remover livro da wishlist
- Listar wishlist

### 📖 ReadList (USER)
- Marcar livro como lido
- Desmarcar livro
- Listar livros lidos

---

## 🔐 Autenticação & Autorização

- Autenticação via JWT (expiração de 3 dias)
- Middleware `ensureAuthenticated`
- Middleware `ensureRole` para controle de acesso
- `accountId` e `authorId` sempre derivados do token (nunca do body)

---

## 🧠 Decisões de Arquitetura

- Separação por módulos (`auth`, `accounts`, `books`, `wishlist`, `reads`)
- Controllers responsáveis apenas por entrada e saída de dados
- Services concentram regras de negócio
- Repositories isolam acesso ao banco de dados
- Validações feitas com Zod
- Tratamento global de erros
- Responses padronizados no formato:
  ```json
  {
    "data": {},
    "meta": {},
    "error": null
  }
  ```

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js >= 18
- PostgreSQL (local ou Neon)
- npm

### Instalação
```bash
npm install
```

### Variáveis de ambiente
Crie um arquivo .env baseado em .env.example:
```env
DATABASE_URL=postgresql://user:password@host:port/db
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=3d
CORS_ORIGIN=http://localhost:3333
PORT=3333
```

### Prisma
```bash
npx prisma generate
npx prisma migrate dev
```

### Rodar em desenvolvimento
```bash
npm run dev
```

---

## Endpoints

### Auth
- POST /auth/register
- POST /auth/login

### Accounts
- GET /accounts/me
- GET /accounts/me/summary

### Books
- GET /books?page=1&limit=10
- POST /books (AUTHOR)
- GET /books/mine (AUTHOR)

### Wishlist (USER)
- POST /wishlist/:bookId
- DELETE /wishlist/:bookId
- GET /wishlist

### Reads (USER)
- POST /reads/:bookId
- DELETE /reads/:bookId
- GET /reads