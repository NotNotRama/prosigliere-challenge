import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="flex justify-between p-4">
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
    </nav>
  );
}
