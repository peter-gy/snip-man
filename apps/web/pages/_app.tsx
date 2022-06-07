import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SnipManStateProvider } from '../modules/snip-man-state/context/SnipManContext';

const queryClient = new QueryClient();

function SnipManWebApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnipManStateProvider>
          <Component {...pageProps} />
        </SnipManStateProvider>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </GeistProvider>
  );
}

export default SnipManWebApp;
