import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth/react/types';
import { Provider } from 'zustand';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Goal, User, Workout } from '@/types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

interface GoalState {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => Promise<void>;
  deleteGoal: (id: number) => Promise<void>;
  setGoalModalOpen: (isOpen: boolean) => void;
}

interface WorkoutState {
  workouts: Workout[];
  setWorkouts: (workouts: Workout[]) => void;
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workout: Workout) => Promise<void>;
  deleteWorkout: (id: number) => Promise<void>;
}

interface ShareState {
  shareModalData: { type: string; data: Goal | Workout } | null;
  setShareModalData: (data: { type: string; data: Goal | Workout } | null) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-store',
      getStorage: () => createJSONStorage(() => localStorage),
    }
  )
);

const useGoalStore = create<GoalState>()(
  persist(
    (set, get) => ({
      goals: [],
      setGoals: (goals) => set({ goals }),
      addGoal: async (goal: Goal) => {
        const response = await fetch('/api/goals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(goal),
        });

        if (response.ok) {
          const newGoal = await response.json();
          set((state) => ({ goals: [...state.goals, newGoal] }));
        } else {
          console.error('Error creating goal:', response.status);
        }
      },
      updateGoal: async (goal: Goal) => {
        const response = await fetch(`/api/goals/${goal.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(goal),
        });

        if (response.ok) {
          const updatedGoals = get().goals.map((g) =>
            g.id === goal.id ? goal : g
          );
          set({ goals: updatedGoals });
        } else {
          console.error('Error updating goal:', response.status);
        }
      },
      deleteGoal: async (id: number) => {
        const response = await fetch(`/api/goals/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          set((state) => ({
            goals: state.goals.filter((g) => g.id !== id),
          }));
        } else {
          console.error('Error deleting goal:', response.status);
        }
      },
      setGoalModalOpen: (isOpen: boolean) => set({ goalModalOpen: isOpen }),
    }),
    {
      name: 'goal-store',
      getStorage: () => createJSONStorage(() => localStorage),
    }
  )
);

const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      workouts: [],
      setWorkouts: (workouts) => set({ workouts }),
      addWorkout: async (workout: Workout) => {
        const response = await fetch('/api/workouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(workout),
        });

        if (response.ok) {
          const newWorkout = await response.json();
          set((state) => ({ workouts: [...state.workouts, newWorkout] }));
        } else {
          console.error('Error creating workout:', response.status);
        }
      },
      updateWorkout: async (workout: Workout) => {
        const response = await fetch(`/api/workouts/${workout.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(workout),
        });

        if (response.ok) {
          const updatedWorkouts = get().workouts.map((w) =>
            w.id === workout.id ? workout : w
          );
          set({ workouts: updatedWorkouts });
        } else {
          console.error('Error updating workout:', response.status);
        }
      },
      deleteWorkout: async (id: number) => {
        const response = await fetch(`/api/workouts/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          set((state) => ({
            workouts: state.workouts.filter((w) => w.id !== id),
          }));
        } else {
          console.error('Error deleting workout:', response.status);
        }
      },
    }),
    {
      name: 'workout-store',
      getStorage: () => createJSONStorage(() => localStorage),
    }
  )
);

const useShareStore = create<ShareState>()(
  (set) => ({
    shareModalData: null,
    setShareModalData: (data) => set({ shareModalData: data }),
  })
);

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { goals, setGoals } = useGoalStore();
  const { workouts, setWorkouts } = useWorkoutStore();

  useEffect(() => {
    if (pageProps.session) {
      setUser(pageProps.session.user as User);
    }
  }, [pageProps.session]);

  useEffect(() => {
    if (user) {
      const fetchGoals = async () => {
        const response = await fetch(`/api/goals/${user.id}`);
        const data = await response.json();
        setGoals(data);
      };

      const fetchWorkouts = async () => {
        const response = await fetch(`/api/workouts/${user.id}`);
        const data = await response.json();
        setWorkouts(data);
      };

      fetchGoals();
      fetchWorkouts();
    }
  }, [user]);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={useUserStore}>
        <Provider store={useGoalStore}>
          <Provider store={useWorkoutStore}>
            <Provider store={useShareStore}>
              <Component {...pageProps} />
            </Provider>
          </Provider>
        </Provider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;