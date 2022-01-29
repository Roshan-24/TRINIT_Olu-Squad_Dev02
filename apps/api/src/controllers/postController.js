import prisma from '../config/prismaClient';
import PrismaClient from '@prisma/client';

export const createNewPost = async (req, res) => {
  try {
    console.log(req.body);
    const post = await prisma.threadPost.create({
      data: {
        name: req.body.bugName,
        raisedBy: {
          connect: {
            id: parseInt(req.user.id)
          }
        },
        bugCategory: {
          connect: {
            id: parseInt(req.body.bugCategoryId)
          }
        },
        bugStatus: PrismaClient.BugStatus.PENDING,
        description: req.body.description
      }
    });

    res.status(201).json({ bug, thread });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
