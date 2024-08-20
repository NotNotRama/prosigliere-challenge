import React from 'react';
import { Character } from '@/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';
import { isValidImageSrc } from '@/utils';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.includes(character.id);

  const handleFavorite = () => {
    if (isFavorited) {
      removeFavorite(character.id);
    } else {
      addFavorite(character.id);
    }
  };

  return (
    <div className="overflow-hidden bg-black shadow-md" role="listitem" data-testid={`character-card-${character.id}`}>
      <h2 className="py-4 text-center text-xl font-semibold text-white">{character.name}</h2>
      <div className="relative mx-auto h-96 w-80">
        <Link href={`/character/${character.id}`} passHref>
          {isValidImageSrc(character.image) ? (
            <Image src={character.image} alt={character.name} layout="fill" objectPosition="top" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
              No Image Available
            </div>
          )}
        </Link>
      </div>
      <button
        className={`w-80 py-2 ${
          isFavorited ? 'bg-gray-500' : 'bg-blue-500'
        } mx-auto block text-white hover:bg-blue-600`}
        onClick={handleFavorite}
        aria-pressed={isFavorited}
        aria-label={isFavorited ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`}
      >
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
}
