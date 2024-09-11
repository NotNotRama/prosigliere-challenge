import { House } from '@/hooks/useHouse';
import Link from 'next/link';
import { useState } from 'react';

type NavbarProps = {
  house: House;
  setHouse: (newHouse: House | null) => void;
};

export function Navbar({ house, setHouse }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <nav className="relative flex justify-between p-4" aria-label="Main Navigation">
      <div className="flex flex-col md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Main Navigation" aria-expanded={isMenuOpen}>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-14 bg-black p-4">
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/staff">Staff</Link>
              </li>
              <li>
                <Link href="/students">Students</Link>
              </li>
              <li>
                <Link href="/favourites">Favourites</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <ul className="hidden gap-3 md:flex">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/staff">Staff</Link>
        </li>
        <li>
          <Link href="/students">Students</Link>
        </li>
        <li>
          <Link href="/favourites">Favourites</Link>
        </li>
      </ul>
      <div className="flex">
        <fieldset className="flex">
          <legend className="sr-only">Select House</legend>
          {['gryffindor', 'slytherin', 'hufflepuff', 'ravenclaw'].map((houseOption) => (
            <label
              key={houseOption}
              className="mr-4 inline-flex items-center"
              aria-checked={house === houseOption}
            >
              <input
                type="radio"
                name="house"
                value={houseOption}
                checked={house === houseOption}
                onChange={() => setHouse(houseOption as House)}
                className="mr-1"
              />
              <p className="capitalize">{houseOption}</p>
            </label>
          ))}
        </fieldset>
      </div>
    </nav>
  );
}
