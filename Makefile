.PHONY: dev prod down logs rebuild

MODE ?= dev
DEV_COMPOSE = docker compose -f docker-compose.yml
PROD_COMPOSE = docker compose -f docker-compose.prod.yml

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
