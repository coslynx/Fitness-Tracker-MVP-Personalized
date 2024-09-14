import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/utils/prisma';

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
      const { email, password } = req.body;

      try {
        const user = await prisma.user.create({
          data: {
            email,
            password,
          },
        });

        return res.status(201).json(user);
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'GET':
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        return res.status(200).json(user);
      } catch (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}