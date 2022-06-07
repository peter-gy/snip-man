import { Page } from '@geist-ui/core';
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
      <Page>
        <Page.Header>
          <Header />
        </Page.Header>
        <Page.Content>
          <HomeContent />
        </Page.Content>
        <Page.Footer>
          <Footer />
        </Page.Footer>
      </Page>
    </div>
  );
};

export default Index;
