import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navbar } from '@/components/Navbar';

function AppContent({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default function App(appProps: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <HydrationBoundary state={appProps.pageProps.dehydratedState}>
        <AppContent {...appProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
