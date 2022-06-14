# Join the DB .env files and create aggregated ones in `apps/server/src/assets`
prisma-env:
	echo "# GENERATED FILE, DO NOT MODIFY MANUALLY\n\n$$(<services/mongo/.env)\n\n$$(<services/postgres/.env)" > apps/server/src/assets/.env.production
	echo "# GENERATED FILE, DO NOT MODIFY MANUALLY\n\n$$(<services/mongo/.env.dev)\n\n$$(<services/postgres/.env.dev)" > apps/server/src/assets/.env.development

build-prod:
	docker build . -t snip-man:nx-base
	docker-compose build

prod-up: build-prod
	docker-compose up -d

prod-down:
	docker-compose down

build-dev:
	docker-compose -f docker-compose.dev.yml build

dev-up: build-dev
	docker-compose -f docker-compose.dev.yml up -d mongo postgres
	docker-compose -f docker-compose.dev.yml run --rm --service-ports nx-dev bash

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-up-local: build-dev
	docker-compose -f docker-compose.dev.yml up -d mongo postgres
	echo "Waiting 25 seconds for mongo to be ready..." && sleep 25
	npm run local:project:serve
