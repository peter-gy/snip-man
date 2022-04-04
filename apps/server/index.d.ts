declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: ?int;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      MONGO_USER: string;
      MONGO_PASSWORD: string;
      MONGO_DB: string;
    }
  }
}

// convert this file into a module by adding an empty export statement
// in order to gain IntelliSense for ``ProcessEnv`` typings
export {};
