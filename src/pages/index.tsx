import { Inter } from 'next/font/google';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { client } from '@/lib/client';
import { useAllCharacters } from '@/lib/react-query/useAllCharacters';
import { Layout } from '@/components/Layout';

export default function Home() {
  const { data: characters, error } = useAllCharacters();

  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  return <Layout characters={characters} title="HD Characters" />;
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['allCharacters'],
    queryFn: () => client.getAllCharacters(),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3600,
  };
}
