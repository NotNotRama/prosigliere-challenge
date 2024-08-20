import { Character } from '@/lib/client';
import CharacterCard from './CharacterCard';

type LayoutProps = {
  characters: Character[] | undefined;
  title: string;
};

export function Layout({ characters, title }: LayoutProps) {
  if (!characters) return <div>No characters</div>;
  return (
    <main className="min-h-screen p-8 bg-theme-background text-theme-text">
      <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
      <div
        className="flex flex-wrap items-center justify-center gap-3"
        role="list"
      >
        {characters?.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </main>
  );
}
