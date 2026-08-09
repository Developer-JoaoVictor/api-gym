# Gym API

API para gestão de academias, autenticação de usuários e registro de check-ins com validação geográfica e controle de acesso por perfil.

Este projeto foi desenvolvido para demonstrar capacidade de construir uma aplicação backend robusta, com foco em arquitetura limpa, autenticação segura, regras de negócio bem definidas, testes automatizados e boas práticas de desenvolvimento em Node.js.

## Visão geral

A aplicação permite que usuários:

- criem conta e autentiquem-se com email e senha;
- consultem seu perfil e dados pessoais;
- encontrem academias por nome e proximidade geográfica;
- realizem check-in em academias dentro de um raio definido;
- consultem histórico e métricas de presença;
- tenham acesso administrativo para validar check-ins de membros.

Para administradores, a API oferece operações para cadastrar novas academias e validar presença dos usuários.

## 🧩 Stack tecnológica

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- JWT + Cookie-based refresh tokens
- Zod para validação de schemas
- Vitest para testes unitários e de integração
- bcryptjs para hash de senhas

## 🌟 Funcionalidades principais

### Autenticação e autorização

- cadastro de usuários;
- autenticação via email e senha;
- geração e validação de JWT;
- refresh token via cookie;
- autenticação por middleware;
- autorização por perfil (`ADMIN` e `MEMBER`).

### Gestão de academias

- cadastro de academias com latitude e longitude;
- busca por nome/título;
- listagem por proximidade geográfica;
- uso de cálculo de distância entre coordenadas para validação de acesso.

### Check-ins

- registro de check-in em academia;
- validação de distância máxima permitida;
- regra de limite de check-ins por dia;
- histórico de presença do usuário;
- métricas de frequência;
- validação de check-in por usuário administrativo.

## 🏗️ Arquitetura e boas práticas aplicadas

A estrutura do projeto foi organizada para refletir boas práticas de backend moderno:

- separação entre controllers, use cases e repositories;
- uso de padrões de Repository para isolar acesso a dados;
- centralização de regras de negócio em casos de uso;
- validação de entradas com Zod;
- tratamento centralizado de erros;
- middleware para autenticação e autorização;
- uso de factories para instanciar dependências;
- uso de injeção de dependência em pontos estratégicos;
- testes focados em comportamento real do domínio.

### Estrutura do projeto

```text
src/
  app.ts
  server.ts
  http/
    controller/
    middlewares/
  repositories/
    prisma/
    in-memory/
  use-cases/
    errors/
    factories/
  utils/
prisma/
  schema.prisma
  migrations/
```

## 📦 Regras de negócio implementadas

Além da camada técnica, o projeto inclui lógica de domínio relevante:

- usuário não pode fazer check-in fora do raio permitido da academia;
- usuário não pode registrar mais de um check-in no mesmo dia na mesma academia;
- check-ins só podem ser validados por perfis administrativos;
- erros específicos são lançados para cenários como credenciais inválidas, recurso inexistente e limites de frequência.

## ✅ Testes

O projeto conta com testes para validar o comportamento principal das regras de negócio:

- testes unitários para casos de uso;
- testes de integração de endpoints;
- cobertura de cenários principais de autenticação, check-in, validação e gestão de academias.

Comandos:

```bash
npm install
npm run test
npm run test:e2e
```

## ▶️ Como executar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` com as variáveis abaixo:

```env
NODE_ENV=dev
JWT_SECRET=sua_chave_secreta
PORT=3333
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api_gym?schema=public"
```

### 3. Inicie o banco de dados

O projeto foi preparado para trabalhar com PostgreSQL e Prisma. Você pode subir o banco via Docker Compose ou com sua instância local.

```bash
docker-compose up -d
```

### 4. Execute as migrações

```bash
npx prisma migrate dev
```

### 5. Rode a aplicação

```bash
npm run dev
```

## 🔐 Endpoints principais

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/users` | Cadastro de usuário |
| POST | `/sessions` | Autenticação |
| PATCH | `/token/refresh` | Refresh do token |
| GET | `/me` | Dados do usuário autenticado |
| GET | `/gyms/search` | Busca por academias |
| GET | `/gyms/nearby` | Academias próximas por localização |
| POST | `/gyms` | Cadastro de academia (ADMIN) |
| POST | `/gyms/:gymId/check-ins` | Registro de check-in |
| GET | `/check-ins/history` | Histórico de check-ins |
| GET | `/check-ins/metrics` | Métricas do usuário |
| PATCH | `/check-ins/:checkInId/validate` | Validação de check-in (ADMIN) |

## 📌 Conclusão

A API de academias foi desenvolvida como um projeto de backend com foco em qualidade, clareza e aplicação de boas práticas. Ela reflete uma base sólida para evolução em sistemas mais complexos, e serve como exemplo de capacidade técnica em JavaScript/TypeScript, APIs REST, autenticação, regras de negócio e estruturas bem organizadas.

---