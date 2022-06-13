import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../modules/layout/views/Header';
import Footer from '../modules/layout/views/Footer';
import HomeContent from '../modules/home/views/HomeContent';

const Index: NextPage = () => {
  return (
    <div className="bg-blue-100">
      <Head>
        <title>SnipMan</title>
        <meta name="description" content="Another code snippet manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex flex-col justify-between mx-4 sm:mx-6 md:mx-8">
        <Header />
        <HomeContent />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
