export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 3333,
  postgres: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  mongo: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DB,
  },
});
