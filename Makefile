build-prod:
	echo "Running Docker build for production"
	docker build . -t snip-man:nx-base && docker-compose build

ph1-prod: build-prod
	docker-compose up -d postgres server web reverse-proxy

ph2-prod: build-prod
	docker-compose up -d mongo server web reverse-proxy

build-dev:
	echo "Running Docker build for development"
	docker-compose -f docker-compose.dev.yml build

nx-dev:
	echo "Starting dockerized NX monorepo"
	docker-compose -f docker-compose.dev.yml run --rm --service-ports nx-dev bash

postgres-dev:
	echo "Starting dockerized Postgres instance for development in detached mode"
	docker-compose -f docker-compose.dev.yml up -d postgres

mongo-dev:
	echo "Starting dockerized MongoDB instance for development in detached mode"
	docker-compose -f docker-compose.dev.yml up -d mongo

ph1-dev: build-dev postgres-dev nx-dev

ph2-dev: build-dev mongo-dev nx-dev
