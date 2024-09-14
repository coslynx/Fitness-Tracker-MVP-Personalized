import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store';
import { Goal } from '@/types';
import { useRouter } from 'next/router';

interface GoalInputProps {
  goal?: Goal;
}

const GoalInput: React.FC<GoalInputProps> = ({ goal }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { createGoal, updateGoal, setGoalModalOpen } = useStore();
  const [name, setName] = useState(goal?.name || '');
  const [target, setTarget] = useState(goal?.target || '');
  const [deadline, setDeadline] = useState(goal?.deadline || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !target || !deadline) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (goal) {
      try {
        await updateGoal({ ...goal, name, target, deadline });
        router.push('/dashboard');
        setGoalModalOpen(false);
      } catch (error) {
        setErrorMessage('Error updating goal.');
      }
    } else {
      try {
        await createGoal({ name, target, deadline, userId: session?.user?.id });
        router.push('/dashboard');
        setGoalModalOpen(false);
      } catch (error) {
        setErrorMessage('Error creating goal.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Goal Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="target" className="block text-sm font-medium text-gray-700">
          Target
        </label>
        <input
          type="text"
          id="target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      <button
        type="submit"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {goal ? 'Update Goal' : 'Create Goal'}
      </button>
    </form>
  );
};

export default GoalInput;