import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function SnipManWebApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </GeistProvider>
  );
}

export default SnipManWebApp;
