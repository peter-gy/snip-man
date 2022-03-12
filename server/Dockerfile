# ==== 
# Dockerfile based on the example: https://blog.logrocket.com/containerized-development-nestjs-docker/
# ====

# Install dependencies only when needed
FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

# Rebuild the source code only when needed
FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 4000
ENV PORT 4000

CMD ["node", "dist/main"]