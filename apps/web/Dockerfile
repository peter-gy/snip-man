FROM node:16.14.2-buster

WORKDIR /app
ENV PORT=4200
EXPOSE ${PORT}

COPY ./dist/apps/web .
ENV NODE_ENV=production
RUN npm install

CMD ["npm", "run", "start"]