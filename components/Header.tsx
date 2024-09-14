import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store';

const Header: React.FC = () => {
  const { data: session } = useSession();
  const { logout } = useStore();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800">Fitness Tracker</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {session && (
              <>
                <li>
                  <Link href="/dashboard">
                    <a className="text-gray-600 hover:text-gray-800">Dashboard</a>
                  </Link>
                </li>
                <li>
                  <Link href="/goals">
                    <a className="text-gray-600 hover:text-gray-800">Goals</a>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!session && (
              <>
                <li>
                  <Link href="/login">
                    <a className="text-gray-600 hover:text-gray-800">Login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <a className="text-gray-600 hover:text-gray-800">Sign Up</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;