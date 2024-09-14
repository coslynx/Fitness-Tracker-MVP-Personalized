import { Goal, Workout } from '@/types';

export const validateGoal = (goal: Goal): string | null => {
  if (!goal.name || goal.name.trim() === '') {
    return 'Goal name is required';
  }

  if (!goal.target || goal.target.trim() === '') {
    return 'Target is required';
  }

  if (!goal.deadline) {
    return 'Deadline is required';
  }

  return null;
};

export const validateWorkout = (workout: Workout): string | null => {
  if (!workout.name || workout.name.trim() === '') {
    return 'Workout name is required';
  }

  if (!workout.duration || workout.duration < 0) {
    return 'Workout duration must be a non-negative number';
  }

  if (!workout.date) {
    return 'Workout date is required';
  }

  return null;
};