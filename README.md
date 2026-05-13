# Board React/PHP (React + PHP + Nginx + PostgreSQL)

Projeto full stack com dois modos de execução via Docker Compose:

- desenvolvimento: foco em produtividade (hot reload e volumes locais)
- produção: foco em comportamento próximo de ambiente real (build otimizado, sem volumes de código)

## Modos de execução

### Desenvolvimento (`make dev`)

Características:

- frontend com Vite em modo dev e hot reload
- código montado por volume local (`./frontend` e `./backend`)
- logs visíveis no terminal (execução em foreground)
- API PHP disponível via Nginx

Comandos:

```bash
make dev
```

URLs:

- Frontend: `http://localhost:3000`
- API (`/health`): `http://localhost:8080/health`
- PostgreSQL: `localhost:5432`

---

### Produção (`make prod`)

Características:

- frontend buildado com `npm ci` + `npm run build`
- frontend servido por Nginx
- proxy `/api` no Nginx do frontend para o Nginx da API
- backend PHP com configurações de produção (sem exposição de erros)
- sem volumes locais de código
- serviços com `restart: unless-stopped`

Comandos:

```bash
make prod
```

URLs:

- Frontend: `http://localhost:3000`
- API direta (opcional): `http://localhost:8080/health`
- API via frontend: `http://localhost:3000/api/health`

## Comandos auxiliares

```bash
make down     # derruba stacks dev/prod e remove órfãos
make logs     # acompanha logs (stack dev)
make rebuild  # rebuild completo da stack dev
```

Também é possível usar os mesmos comandos para produção:

```bash
make logs MODE=prod
make rebuild MODE=prod
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste se necessário.

Exemplo:

```env
POSTGRES_DB=app_db
POSTGRES_USER=app_user
POSTGRES_PASSWORD=app_password

DB_HOST=database
DB_PORT=5432
DB_DATABASE=app_db
DB_USERNAME=app_user
DB_PASSWORD=app_password

# Desenvolvimento (frontend em Vite)
VITE_API_URL=http://localhost:8080

# Produção (frontend em Nginx com proxy /api)
VITE_API_URL_PROD=/api
```

## Estrutura de deploy

- `docker-compose.yml`: modo desenvolvimento
- `docker-compose.prod.yml`: modo produção
- `frontend/Dockerfile`:
  - stage `development` (Vite)
  - stage `production` (build + Nginx)
- `backend/Dockerfile`:
  - stage `development` (php.ini-development)
  - stage `production` (php.ini-production + hardening)
- `nginx/default.conf`: Nginx da API (PHP-FPM)
- `frontend/nginx.conf`: Nginx do frontend com fallback SPA e proxy `/api`

## Database
- postgreSQL foi escolhido porque o domínio possui relacionamentos claros entre boards, membros e tarefas. Ele oferece consistência, integridade referencial, boas consultas para contadores/filtros e ainda permite flexibilidade com JSONB para configurações visuais.

## Teste rápido da API

```bash
curl http://localhost:8080/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "database": "connected"
}
```
