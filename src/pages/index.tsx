import Image from 'next/image';
import { Inter } from 'next/font/google';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { client } from '@/lib/client';
import { useAllCharacters } from '@/lib/react-query/useAllCharacters';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: characters, error } = useAllCharacters();

  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-4xl font-bold">HP Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters?.map((character) => (
          <div
            key={character.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-xl text-black font-bold">{character.name}</h2>
            <p>{character.species}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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
};
