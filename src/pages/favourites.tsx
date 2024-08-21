import React from 'react';

import { useAllCharacters } from '@/lib/react-query/useAllCharacters';
import { CharacterCard } from '@/components/CharacterCard';
import { useFavorites } from '@/context/FavoritesContext';
import { QueryClient } from '@tanstack/react-query';

export default function FavouritesPage() {
  const { data: characters, error } = useAllCharacters();

  const { favorites } = useFavorites();

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const favoritedCharacters = characters?.filter((character) => favorites.includes(character.id));

  return (
    <main className="min-h-screen bg-theme-background p-8 text-theme-text">
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
import { revalidateDuration } from '@/utils';

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
    revalidate: revalidateDuration,
  };
}
