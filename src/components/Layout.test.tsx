import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Layout } from './Layout';
import { Character } from '@/lib/client';
import { FavoritesProvider } from '@/context/FavoritesContext';

describe('Layout', () => {
  const mockCharacters: Character[] = [
    {
      id: '1',
      name: 'Harry Potter',
      image: 'harry.jpg',
      alternate_names: [],
      species: 'human',
      gender: 'male',
      house: 'Gryffindor',
      dateOfBirth: '1980-07-31',
      yearOfBirth: 1980,
      wizard: true,
      ancestry: 'half-blood',
      eyeColour: 'green',
      hairColour: 'black',
      wand: { wood: 'holly', core: 'phoenix feather', length: 11 },
      patronus: 'stag',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Daniel Radcliffe',
      alternate_actors: [],
      alive: true,
    },
    {
      id: '2',
      name: 'Hermione Granger',
      image: 'hermione.jpg',
      alternate_names: [],
      species: 'human',
      gender: 'female',
      house: 'Gryffindor',
      dateOfBirth: '1979-09-19',
      yearOfBirth: 1979,
      wizard: true,
      ancestry: 'muggle-born',
      eyeColour: 'brown',
      hairColour: 'brown',
      wand: { wood: 'vine', core: 'dragon heartstring', length: 10.75 },
      patronus: 'otter',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Emma Watson',
      alternate_actors: [],
      alive: true,
    },
  ];

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<FavoritesProvider>{ui}</FavoritesProvider>);
  };

  it('renders the title', () => {
    renderWithProviders(<Layout characters={mockCharacters} title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders CharacterCards for each character', () => {
    renderWithProviders(<Layout characters={mockCharacters} title="Test Title" />);
    mockCharacters.forEach((character) => {
      expect(screen.getByTestId(`character-card-${character.id}`)).toBeInTheDocument();
    });
  });

  it('renders no CharacterCards when characters array is empty', () => {
    renderWithProviders(<Layout characters={[]} title="Test Title" />);
    expect(screen.queryByTestId(/character-card-/)).not.toBeInTheDocument();
  });

  it('renders correctly when characters are undefined', () => {
    renderWithProviders(<Layout characters={undefined} title="Test Title" />);
    expect(screen.getByText('No characters')).toBeInTheDocument();
  });
});
