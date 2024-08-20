import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navbar } from '@/components/Navbar';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { useHouse } from '@/hooks/useHouse';

function AppContent({ Component, pageProps }: AppProps) {
  const { house, setHouse } = useHouse();

  const houseThemeClass = house ? `theme-${house}` : '';

  return (
    <div className={`min-h-screen ${houseThemeClass}`}>
      <Navbar house={house} setHouse={setHouse} />
      <Component {...pageProps} />
    </div>
  );
}

export default function App(appProps: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />

      <FavoritesProvider>
        <HydrationBoundary state={appProps.pageProps.dehydratedState}>
          <AppContent {...appProps} />
        </HydrationBoundary>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}
