FROM node:16.14.2-buster

WORKDIR /app
ENV PORT=3333
EXPOSE ${PORT}

COPY ./dist/apps/server .
ENV NODE_ENV=production
RUN npm install

CMD ["node", "main.js"]