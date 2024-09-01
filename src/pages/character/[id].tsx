import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { Character, client } from '@/lib/client';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { revalidateDuration } from '@/utils';

export default function CharacterDetail({ character }: { character: Character }) {
  if (!character) return <div>Character not found</div>;

  return (
    <main className="min-h-screen bg-theme-background">
      <div className="flex flex-col items-center p-8">
        <h1 className="mb-8 text-center text-4xl font-bold">{character.name}</h1>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex items-start justify-center">
            <Image
              src={character.image}
              alt={`Image of ${character.name}`}
              width={400}
              height={600}
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="rounded-lg bg-white bg-opacity-90 p-6 text-black shadow-lg">
            <CharacterInfo label="Species" value={character.species} />
            <CharacterInfo label="Gender" value={character.gender} />
            <CharacterInfo label="House" value={character.house} />
            <CharacterInfo label="Date of Birth" value={character.dateOfBirth} />
            <CharacterInfo label="Ancestry" value={character.ancestry} />
            <CharacterInfo label="Eye Colour" value={character.eyeColour} />
            <CharacterInfo label="Hair Colour" value={character.hairColour} />
            <CharacterInfo
              label="Wand"
              value={`${character.wand.wood || 'Unknown'} wood, ${character.wand.core || 'Unknown'} core, ${
                character.wand.length ? `${character.wand.length}"` : 'Unknown'
              } long`}
            />
            <CharacterInfo label="Patronus" value={character.patronus || 'Unknown'} />
            <CharacterInfo
              label="Hogwarts"
              value={
                character.hogwartsStudent ? 'Student' : character.hogwartsStaff ? 'Staff' : 'N/A'
              }
            />
            <CharacterInfo label="Actor" value={character.actor} />
            <CharacterInfo label="Status" value={character.alive ? 'Alive' : 'Deceased'} />
          </div>
        </div>
      </div>
    </main>
  );
}

function CharacterInfo({ label, value }: { label: string; value: string }) {
  return (
    <p className="mb-4">
      <span className="font-semibold capitalize">{label}: </span>
      <span className="capitalize">{value}</span>
    </p>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const characters = await client.getAllCharacters();

  const paths = characters.map((character) => ({
    params: { id: character.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  if (!params?.id) {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }

  const character = await client.getCharacter(params.id as string);

  if (!character) {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      character,
    },
    revalidate: revalidateDuration,
  };
};
