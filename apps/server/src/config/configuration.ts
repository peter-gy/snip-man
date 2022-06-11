const expectedVariableKeys = [
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
  'MONGODB_USERNAME',
  'MONGODB_PASSWORD',
  'MONGODB_DATABASE',
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
    user: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE,
  },
});
