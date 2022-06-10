const expectedVariableKeys = [
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
  'MONGO_INITDB_ROOT_USERNAME',
  'MONGO_INITDB_ROOT_PASSWORD',
  'MONGO_INITDB_DATABASE',
];
export const shouldLoadConfig = () =>
  !expectedVariableKeys.every((key) => process.env[key]);

export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 3333,
  postgres: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  mongo: {
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    database: process.env.MONGO_INITDB_DATABASE,
  },
});
