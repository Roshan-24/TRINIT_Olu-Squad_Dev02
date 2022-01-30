import prisma from '../config/prismaClient';
import PrismaClient from '@prisma/client';

export const createNewPost = async (req, res) => {
  try {
    console.log(req.body);
    const post = await prisma.threadPost.create({
      data: {
        content: req.body.content,
        user: {
          connect: {
            id: req.user.id
          }
        },
        thread: {
          connect: {
            id: req.body.threadId
          }
        }
      }
    });

    res.status(201).json({ post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
