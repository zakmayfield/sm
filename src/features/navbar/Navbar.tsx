import Link from 'next/link';

export default async function Navbar() {
  return (
    <nav className='flex items-center gap-6'>
      {/* logo */}
      <div>
        <Link href='/'>🍞</Link>
      </div>

      {/* search bar */}

      {/* links */}
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
      </ul>

      <div>
        <Link href='/sign-in'>Sign In</Link>
      </div>
    </nav>
  );
}
