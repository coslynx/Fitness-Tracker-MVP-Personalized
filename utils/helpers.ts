import { Goal, Workout } from '@/types';

export const formatDate = (date: Date | number): string => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString();
};

export const calculateProgress = (
  userId: number,
  goal?: Goal,
  workout?: Workout
): number => {
  if (goal) {
    // Calculate progress based on goal type (e.g., weight loss)
    // This is a placeholder for a more comprehensive calculation
    return 0;
  } else if (workout) {
    // Calculate progress based on workout type (e.g., duration)
    // This is a placeholder for a more comprehensive calculation
    return workout.duration;
  }
  return 0;
};

export const getFormattedProgress = (progress: number, goal?: Goal): string => {
  if (goal) {
    // Format progress based on goal type (e.g., weight loss in kg)
    // This is a placeholder for a more comprehensive formatting
    return `${progress} kg`;
  }
  return `${progress}`;
};