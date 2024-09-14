import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from '@/store';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setUser } = useStore();

  useEffect(() => {
    if (session) {
      setUser(session.user);
      router.push('/dashboard');
    }
  }, [session, setUser]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to the Fitness Tracker!</h2>
        <p className="text-gray-600 text-center">
          Track your fitness progress, set goals, and connect with a community.
        </p>
      </div>
    </div>
  );
};

export default IndexPage;