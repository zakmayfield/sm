import { getAuthSession } from '@/lib/auth';
import Link from 'next/link';

export default async function Navbar() {
  const session = await getAuthSession();
  console.log(session);
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

      {session ? (
        <p>Hello User</p>
      ) : (
        <div>
          <Link href='/sign-in'>Sign In</Link>
        </div>
      )}
    </nav>
  );
}
