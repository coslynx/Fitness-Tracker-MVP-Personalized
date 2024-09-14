import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store';
import { Goal, Workout } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ProgressChartProps {
  goal?: Goal;
  workout?: Workout;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goal, workout }) => {
  const { data: session } = useSession();
  const { getProgressData } = useStore();
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
    <div className="mt-4">
      <LineChart width={600} height={300} data={chartData}>
        <XAxis dataKey="date" tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()} />
        <YAxis dataKey="value" tickFormatter={(value) => `${value}`} />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default ProgressChart;