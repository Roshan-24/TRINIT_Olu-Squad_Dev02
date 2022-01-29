import prisma from '../config/prismaClient';
import PrismaClient from '@prisma/client';

export const createNewBug = async (req, res) => {
  try {
    console.log(req.body);
    const bug = await prisma.bug.create({
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
    const thread = await prisma.thread.create({
      data: {
        bug: {
          connect: {
            id: parseInt(bug.id)
          }
        }
      }
    });

    res.status(201).json({ bug, thread });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const getBugById = async (req, res) => {
  try {
    const curBug = await prisma.bug.findUnique({
      where: {
        id: Number(req.params['id'])
      },
      include: {
        bugCategory: {
          include: {
            project: {
              include: {
                organization: true
              }
            }
          }
        },
        raisedBy: true
      }
    });
    const curThread = await prisma.thread.findUnique({
      where: {
        id: curBug.id
      },
      include: {
        Post: {
          include: {
            user: true
          }
        }
      }
    });
    if (curBug && curThread) res.json({ bug: curBug, thread: curThread });
    else return;
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Project not found' });
  }
};
