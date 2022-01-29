import prisma from '../config/prismaClient';

export const fetchChat = async (req, res) => {};

export const createNewThread = async (req, res) => {
  const { bugId } = req.body;
  try {
    console.log(req.body);
    const thread = await prisma.thread.create({
      data: {
        bug: {
          connect: {
            id: parseInt(bugId)
          }
        }
      }
    });
    return res.status(201).json({ thread });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};
