# SnipMan

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450" alt="NX Logo"></p>

🔎 **Smart, Fast and Extensible Build System**

**Table of contents**

- [Development Environment Setup](#development-environment)
- [Production Build & Run](#production-build--run)
- [Working with `nx`](#working-with-nx)

## Development Environment

The development environment of this project is fully dockerized via `Dockerfile.dev` and `docker-compose.dev.yml`. The
setup makes it possible to edit the source files locally and run the `nx` commands inside a docker container. In
addition, the database services can be also managed via `docker-compose`.

Steps to start the development environment:

1. Build the services: `make build-dev`
2. Start one of the databases: `make postgres-dev` or `make mongo-dev`
3. Start the `nx` environment: `make nx-dev`

Note that the repository root gets mounted bi-directionally into the `/usr/snip-man-dev/` directory of the `nx-dev`
service, therefore file-system changes made on the host will be immediately present inside the container, and
vice-versa.

### Shortcuts

#### Phase 1 - RDBMS feat. Postgres

Starts the development environment with a Postgres instance.

```shell
make ph1-dev
```

#### Phase 2 - NoSQL feat. MongoDB

Starts the development environment with a MongoDB instance.

```shell
make ph2-dev
```

## Production Build & Run

The system can be built using Docker only:

1. Build the base `nx` image:

```shell
docker build . -t snip-man:nx-base
```

Note that this base image containing the whole repository source is necessary for the build to succeed,
as `nx` needs access to the whole monorepo to do shared module transpilation and more advanced dependency-graph based
dependency resolution.

2. Build the Docker services:

```shell
docker-compose build
```

The full system can be started by executing:

```shell
docker-compose up
```

**Convenience command to execute the steps above at once:**

Using pure `bash`:

```shell
docker build . -t snip-man:nx-base && docker-compose build
```

Using `make`:

Phase 1, RDBMS feat. Postgres

```shell
make ph1-prod
```

Phase 2, RDBMS feat. MongoDB

```shell
make ph2-prod
```

### Accessing App Components

Only the `web` and `server` components are exposed publicly. They can be accessed both with and without using SSL.
Please note that self-signed SSL certificates are generated upon container startup, hence your browser will complain
about security risks when visiting any of the below HTTPS links.

- `web`:
  - [http://localhost](http://localhost)
  - [https://localhost](https://localhost)
- `server`:
  - [http://localhost:3333/api](http://localhost:3333/api)
  - [https://localhost:8443/api](https://localhost:8443/api)

## Working with `nx`

### Serving Project `web`

In order to serve the `Next` application, residing in `./apps/web`, execute:

```shell
npx nx run web:serve
```

The app should be accessible under http://localhost:4200.

### Serving Project `server`

In order to serve the `Nest` application, residing in `./apps/server`, execute:

```shell
npx nx run server:serve
```

The app should be accessible under http://localhost:3333/api.

### Parallel Serve

In order to execute both the `Next` and `Nest` applications, execute:

```shell
npx nx run-many --target=serve --projects=web,server
```

### Formatting the Whole Project

The whole project source code can be formatted by executing:

```shell
npx nx format:write
```

### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

### ☁ Nx Cloud

#### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png" alt="NX Cloud Card"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that
are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s
advanced code generation and project dependency graph, plus a unified experience for both frontend and backend
developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
