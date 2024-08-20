import Link from 'next/link';
import { House, useHouse } from '@/context/HouseContext';

export function Navbar() {
  const { house, setHouse } = useHouse();

  return (
    <nav className="flex justify-between p-4" aria-label="Main Navigation">
      <ul className="flex gap-5">
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
        <fieldset>
          <legend className="sr-only">Select House</legend>
          {['gryffindor', 'slytherin', 'hufflepuff', 'ravenclaw'].map((houseOption) => (
            <label key={houseOption} className="mr-4 inline-flex items-center" aria-checked={house === houseOption}>
              <input
                type="radio"
                name="house"
                value={houseOption}
                checked={house === houseOption}
                onChange={() => setHouse(houseOption as House)}
                className="mr-2"
              />
              {houseOption.charAt(0).toUpperCase() + houseOption.slice(1)}
            </label>
          ))}
        </fieldset>
      </div>
    </nav>
  );
}
