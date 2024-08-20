import React from 'react';
import { Character } from '@/lib/client';
import Image from 'next/image';
import Link from 'next/link';
interface CharacterCardProps {
  character: Character;
}

const isValidImageSrc = (src: string) => {
  try {
    new URL(src);
    return true;
  } catch {
    return false;
  }
};

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="bg-black shadow-md" role="listitem" data-testid={`character-card-${character.id}`}>
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
    </div>
  );
}

export default CharacterCard;
