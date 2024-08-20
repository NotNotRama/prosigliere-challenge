import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { client } from '@/lib/client';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useCharacter } from '@/lib/react-query/useCharacter';
import { revalidateDuration } from '@/utils';

export default function CharacterDetail() {
  const { data: character, error } = useCharacter();
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  if (!character) return <div>Loading</div>;

  return (
    <main className="bg-theme-background text-theme-text min-h-screen">
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
          <div className="rounded-lg bg-white bg-opacity-90 p-6 shadow-lg">
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  if (!params?.id) {
    return {
      notFound: true,
      revalidate: revalidateDuration,
    };
  }

  await queryClient.prefetchQuery({
    queryKey: ['character'],
    queryFn: () => client.getCharacter(params.id as string),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: revalidateDuration,
  };
};
