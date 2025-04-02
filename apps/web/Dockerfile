# Build `web`
FROM snip-man:nx-base AS builder

ARG NX_BUILD_ARGS

WORKDIR /usr/src/builder
COPY . .
RUN npx nx build web $NX_BUILD_ARGS

# Runs the artifacts built by `builder`
FROM node:lts-alpine3.21 AS runner

ARG NODE_ENV
ARG PORT

WORKDIR /usr/src/app
COPY --from=builder /usr/src/builder/node_modules ./node_modules
COPY --from=builder /usr/src/builder/dist/apps/web/ .

ENV PORT=$PORT
EXPOSE $PORT
ENV NODE_ENV=$NODE_ENV

CMD ["./node_modules/.bin/next", "start"]