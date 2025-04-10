# Using bookworm, a Debian-based Node image, since Python needs to be available to install the project dependencies.
FROM node:lts-bookworm AS base
WORKDIR /usr/src/builder

FROM base AS nx-base

# Install node dependencies
COPY package*.json ./
RUN npm ci

# Generate Prisma clients into `note_modules`
COPY ./services/mongo/schema.prisma ./services/mongo/schema.prisma
COPY ./services/postgres/schema.prisma ./services/postgres/schema.prisma
RUN npm run generate:prisma

# Copy all non-docker-ignored files from the current directory into the container to be accessed by child images
COPY . .