import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GeistProvider, CssBaseline } from '@geist-ui/core';

function SnipManWebApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default SnipManWebApp;
