# Build `server`
FROM snip-man:nx-base AS builder

ARG NX_BUILD_ARGS

WORKDIR /usr/src/builder
COPY . .
RUN npx nx build server $NX_BUILD_ARGS

# Runs the artifacts built by `builder`
FROM node:lts-alpine3.15 AS runner

ARG NODE_ENV
ARG PORT

WORKDIR /usr/src/app
COPY --from=builder /usr/src/builder/node_modules ./node_modules
COPY --from=builder /usr/src/builder/dist/apps/server/ .

ENV PORT=$PORT
EXPOSE $PORT
ENV NODE_ENV=$NODE_ENV

CMD ["node", "./main.js"]