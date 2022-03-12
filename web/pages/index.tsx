import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>SnipMan</title>
                <meta name="description" content="Another code snippet manager" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen flex justify-center items-center">
                <h1 className="text-4xl">Ready for some snippets?</h1>
            </div>
        </div>
    );
};

export default Home;
