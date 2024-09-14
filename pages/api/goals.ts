import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/utils/prisma';
import { Goal } from '@/types';

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
      const { name, target, deadline }: Goal = req.body;

      try {
        const goal = await prisma.goal.create({
          data: {
            name,
            target,
            deadline,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return res.status(201).json(goal);
      } catch (error) {
        console.error('Error creating goal:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'GET':
      try {
        const goals = await prisma.goal.findMany({
          where: {
            userId,
          },
        });

        return res.status(200).json(goals);
      } catch (error) {
        console.error('Error retrieving goals:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'PUT':
      const { id, name, target, deadline }: Goal = req.body;

      try {
        const goal = await prisma.goal.update({
          where: {
            id,
          },
          data: {
            name,
            target,
            deadline,
          },
        });

        return res.status(200).json(goal);
      } catch (error) {
        console.error('Error updating goal:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'DELETE':
      const { id: goalId } = req.query;

      try {
        await prisma.goal.delete({
          where: {
            id: parseInt(goalId as string),
          },
        });

        return res.status(204).end();
      } catch (error) {
        console.error('Error deleting goal:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}