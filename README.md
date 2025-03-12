# MedClin API

API para sistema de agendamento médico.

## Requisitos

- Node.js
- PostgreSQL
- pnpm (ou npm/yarn)

## Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd medclin-backend
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate deploy
```

5. Execute o seed do banco de dados (opcional):
```bash
npx prisma db seed
```

6. Inicie o servidor:
```bash
pnpm start:dev
```

## Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as seguintes variáveis:

- `PORT`: Porta do servidor
- `DB_HOST`: Host do banco de dados
- `DB_PORT`: Porta do banco de dados
- `DB_USER`: Usuário do banco de dados
- `DB_PASS`: Senha do banco de dados
- `DB_NAME`: Nome do banco de dados
- `JWT_SECRET`: Chave secreta para geração de tokens
- `JWT_EXPIRES_IN`: Tempo de expiração dos tokens

## Docker

Para rodar com Docker:

```bash
docker-compose up -d
``` 