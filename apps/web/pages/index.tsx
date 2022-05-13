import { Button } from '@geist-ui/core';
import type { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>SnipMan</title>
        <meta name="description" content="Another code snippet manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl">Ready for some snippets?</h1>
        <div className="p-2">
          <div className="flex">
            <div className="p-2">
              <Button type="success">Hell Yes</Button>
            </div>
            <div className="p-2">
              <Button type="secondary">Not really...</Button>
            </div>
          </div>
          <div className="mt-8">
            <h3>Env:</h3>
            <p>{process.env.NEXT_PUBLIC_SNIPMAN_SERVER_URL}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
