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
    <div
      className="shadow-md overflow-hidden  bg-black"
      role="listitem"
      data-testid={`character-card-${character.id}`}
    >
      <h2 className="text-xl py-4 text-white font-semibold text-center">
        {character.name}
      </h2>
      <div className="relative w-80 h-96 mx-auto">
        <Link href={`/character/${character.id}`} passHref>
          {isValidImageSrc(character.image) ? (
            <Image
              src={character.image}
              alt={character.name}
              layout="fill"
              objectPosition="top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image Available
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default CharacterCard;
