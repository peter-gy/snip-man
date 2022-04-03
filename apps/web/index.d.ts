/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SNIPMAN_SERVER_URL: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

// convert this file into a module by adding an empty export statement
// in order to gain IntelliSense for ``ProcessEnv`` typings
export {};
