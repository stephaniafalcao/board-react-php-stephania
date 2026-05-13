.PHONY: dev prod down logs rebuild migrate fixtures db

MODE ?= dev
DEV_COMPOSE = docker compose -f docker-compose.yml
PROD_COMPOSE = docker compose -f docker-compose.prod.yml
MIGRATIONS_DIR = backend/src/Database/migrations
MIGRATION_FILES = $(sort $(wildcard $(MIGRATIONS_DIR)/*.sql))
FIXTURES_DIR = backend/src/Database/fixtures
FIXTURE_FILES = $(sort $(wildcard $(FIXTURES_DIR)/*.sql))

ifeq ($(MODE),prod)
COMPOSE = $(PROD_COMPOSE)
else
COMPOSE = $(DEV_COMPOSE)
endif

dev:
	$(DEV_COMPOSE) up --build

prod:
	$(PROD_COMPOSE) up --build -d

down:
	$(DEV_COMPOSE) down --remove-orphans
	$(PROD_COMPOSE) down --remove-orphans

logs:
	$(COMPOSE) logs -f

rebuild:
	$(COMPOSE) up --build --force-recreate

migrate:
	@if [ -z "$(MIGRATION_FILES)" ]; then \
		echo "No migration files found in $(MIGRATIONS_DIR)"; \
		exit 1; \
	fi
	$(COMPOSE) up -d database
	@for file in $(MIGRATION_FILES); do \
		echo "Applying $$file"; \
		$(COMPOSE) exec -T database sh -lc 'psql -v ON_ERROR_STOP=1 -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"' < $$file; \
	done

fixtures:
	@if [ -z "$(FIXTURE_FILES)" ]; then \
		echo "No fixture files found in $(FIXTURES_DIR)"; \
		exit 1; \
	fi
	$(COMPOSE) up -d database
	@for file in $(FIXTURE_FILES); do \
		echo "Applying $$file"; \
		$(COMPOSE) exec -T database sh -lc 'psql -v ON_ERROR_STOP=1 -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"' < $$file; \
	done

db:
	$(COMPOSE) up -d database
	$(COMPOSE) exec database sh -lc 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"'
