declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_URL: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

// convert this file into a module by adding an empty export statement
// in order to gain IntelliSense for ``ProcessEnv`` typings
export {};
