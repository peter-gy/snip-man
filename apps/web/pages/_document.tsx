import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class _Document extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="bg-navy-900">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
