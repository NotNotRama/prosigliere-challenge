import React from 'react';
import { Character } from '@/lib/client';
import Image from 'next/image';
import Link from 'next/link';
interface CharacterCardProps {
  character: Character;
}

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
          <Image
            src={character.image}
            alt={character.name}
            layout="fill"
            objectPosition="top"
          />
        </Link>
      </div>
    </div>
  );
}

export default CharacterCard;
