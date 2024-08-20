import { Character } from '@/lib/client';
import CharacterCard from './CharacterCard';

type LayoutProps = {
  characters: Character[] | undefined;
  title: string;
};

export function Layout({ characters, title }: LayoutProps) {
  if (!characters) return <div>No characters</div>;
  return (
    <main className="bg-theme-background text-theme-text min-h-screen p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">{title}</h1>
      <div className="flex flex-wrap items-center justify-center gap-3" role="list">
        {characters?.map((character) => <CharacterCard key={character.id} character={character} />)}
      </div>
    </main>
  );
}
