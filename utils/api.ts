import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/utils/prisma';
import { Goal, Workout } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  switch (req.method) {
    case 'POST':
      // Log a new workout
      const { name, duration, calories, date }: Workout = req.body;

      try {
        const workout = await prisma.workout.create({
          data: {
            name,
            duration,
            calories,
            date,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return res.status(201).json(workout);
      } catch (error) {
        console.error('Error creating workout:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'GET':
      // Retrieve progress data
      try {
        const workouts = await prisma.workout.findMany({
          where: {
            userId,
          },
          orderBy: {
            date: 'desc',
          },
        });

        // Calculate progress metrics
        const totalCaloriesBurned = workouts.reduce(
          (total, workout) => total + workout.calories,
          0
        );

        // Return progress data
        return res.status(200).json({
          totalCaloriesBurned,
          workouts,
        });
      } catch (error) {
        console.error('Error retrieving workouts:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export const getProgressData = async (
  userId: number,
  goal?: Goal,
  workout?: Workout
) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    const chartData: { date: number; value: number }[] = [];

    if (goal) {
      // Calculate progress for the goal
      chartData.push({ date: new Date(goal.deadline).getTime(), value: 0 });
      workouts.forEach((workout) => {
        // Calculate the value based on goal type
        // Example for weight loss (in kilograms)
        const value = workout.calories / 1000;
        chartData.push({ date: new Date(workout.date).getTime(), value });
      });
    } else if (workout) {
      // Calculate progress for the workout
      chartData.push({ date: new Date(workout.date).getTime(), value: workout.duration });
    } else {
      // No goal or workout specified, return empty data
      return [];
    }

    return chartData;
  } catch (error) {
    console.error('Error retrieving progress data:', error);
    return [];
  }
};