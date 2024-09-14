import { useSession } from 'next-auth/react';
import { useStore } from '@/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Goal, Workout } from '@/types';
import { getProgressData } from '@/utils/api';
import GoalInput from '@/components/GoalInput';
import ProgressChart from '@/components/ProgressChart';
import SocialShareButton from '@/components/SocialShareButton';
import Layout from '@/components/Layout';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setGoalModalOpen, setShareModalData } = useStore();

  const [goal, setGoal] = useState<Goal | null>(null);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const goalData = await fetch(`/api/goals/${session.user.id}`).then(
          (res) => res.json()
        );
        const workoutData = await fetch(`/api/workouts/${session.user.id}`).then(
          (res) => res.json()
        );
        setGoal(goalData[0] || null);
        setWorkout(workoutData[0] || null);
        setChartData(await getProgressData(session.user.id, goalData[0], workoutData[0]));
      };
      fetchData();
    }
  }, [session]);

  return (
    <Layout goal={goal} workout={workout}>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Your Fitness Journey</h1>
        <div className="w-full md:w-1/2">
          <ProgressChart chartData={chartData} goal={goal} workout={workout} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Set Your Goals</h2>
          <GoalInput goal={goal} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Workout</h2>
          {workout && (
            <div className="p-4 border rounded shadow">
              <p>Activity: {workout.name}</p>
              <p>Duration: {workout.duration} minutes</p>
              <SocialShareButton workout={workout} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;