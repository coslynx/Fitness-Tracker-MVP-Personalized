import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import { Goal, Workout } from '@/types';
import { getProgressData } from '@/utils/api';
import Button from '@/components/Button';
import Header from '@/components/Header';
import ProgressChart from '@/components/ProgressChart';
import GoalInput from '@/components/GoalInput';
import SocialShareButton from '@/components/SocialShareButton';

interface LayoutProps {
  children: React.ReactNode;
  goal?: Goal;
  workout?: Workout;
}

const Layout: React.FC<LayoutProps> = ({ children, goal, workout }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setGoalModalOpen, setShareModalData } = useStore();

  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const data = await getProgressData(session.user.id, goal, workout);
        setChartData(data);
      };
      fetchData();
    }
  }, [session, goal, workout]);

  return (
    <>
      <Head>
        <title>Fitness Tracker</title>
        <meta name="description" content="Track your fitness progress and connect with others" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          {router.pathname === '/dashboard' && (
            <>
              <h1 className="text-3xl font-bold mb-4">Your Fitness Journey</h1>
              <div className="w-full md:w-1/2">
                <ProgressChart chartData={chartData} goal={goal} workout={workout} />
              </div>
            </>
          )}

          {router.pathname === '/goals' && (
            <>
              <h1 className="text-3xl font-bold mb-4">Set Your Goals</h1>
              <div className="w-full md:w-1/2">
                <GoalInput goal={goal} />
              </div>
            </>
          )}

          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;