import React from 'react';

import { useAllCharacters } from '@/lib/react-query/useAllCharacters';
import CharacterCard from '@/components/CharacterCard';
import { useFavorites } from '@/context/FavoritesContext';
import { QueryClient } from '@tanstack/react-query';

export default function FavouritesPage(): JSX.Element {
  const { data: characters, isLoading, error } = useAllCharacters();
  console.log('characters', characters);
  const { favorites } = useFavorites();
  console.log('favorites', favorites);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const favoritedCharacters = characters?.filter((character) => favorites.includes(character.id));

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">My Favourites</h1>

      {favoritedCharacters && favoritedCharacters.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {favoritedCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <div className="text-center">No favorites yet!</div>
      )}
    </main>
  );
}

import { dehydrate } from '@tanstack/react-query';
import { client } from '@/lib/client';

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
