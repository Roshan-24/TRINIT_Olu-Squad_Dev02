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
    var isAdmin = false;
    if (req.user) {
      const curBugCategory = await prisma.bugCategory.findUnique({
        where: {
          id: bug.bugCategoryId
        },
        include: {
          project: {
            include: {
              admins: true
            }
          }
        }
      });
      curBugCategory.project.admins.forEach(admin => {
        if (admin.id == req.user.id) isAdmin = true;
      });
      if (isAdmin) {
        const curbug = await prisma.bug.update({
          where: {
            id: bug.id
          },
          data: {
            bugStatus: 'APPROVED'
          }
        });
      }
    }

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
        assignedUsers: true,
        bugCategory: {
          include: {
            project: {
              include: {
                organization: true,
                admins: true,
                members: true,
                bugCategories: true
              }
            }
          }
        },
        raisedBy: true
      }
    });
    const curThread = await prisma.thread.findUnique({
      where: {
        bugId: curBug.id
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

export const approveBug = async (req, res) => {
  try {
    console.log(req.body);
    const curBug = await prisma.bug.update({
      where: {
        id: Number(req.params['id'])
      },
      data: { bugStatus: req.body.status }
    });
    if (req.body.status != 'closed') {
      const curProject = await prisma.project.findUnique({
        where: {
          id: req.body.projectId
        },
        include: {
          bugCategories: true
        }
      });

      if (curProject.bugCategories.length > 1) {
        console.log('there');
        const firstbc = await prisma.bugCategory.findFirst({
          where: {
            NOT: { name: 'PENDING' },
            AND: { projectId: curProject.id }
          }
        });
        console.log(firstbc);
        await prisma.bug.update({
          where: {
            id: curBug.id
          },
          data: {
            bugCategory: {
              connect: {
                id: firstbc.id
              }
            }
          }
        });
      } else {
        console.log('here');
        const bugCategory = await prisma.bugCategory.create({
          data: {
            name: 'Default',
            project: {
              connect: {
                id: parseInt(curProject.id)
              }
            }
          }
        });
        await prisma.bug.update({
          where: {
            id: curBug.id
          },
          data: {
            bugCategory: {
              connect: {
                id: bugCategory.id
              }
            }
          }
        });
      }
    }
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Project not found' });
  }
};

export const editBug = async (req, res) => {
  try {
    const curBug = await prisma.bug.update({
      where: {
        id: Number(req.params['id'])
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        bugPriority: Number(req.body.priority),
        bugCategoryId: Number(req.body.bugCategoryId)
      }
    });
    res.status(200).json({ bug: curBug });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Project not found' });
  }
}
export const assignUserBug = async (req, res) => {
  try {
    const curBug = await prisma.bug.update({
      where: {
        id: Number(req.params['id'])
      },
      data: {
        assignedUsers: {
          connect: {
            id: parseInt(req.body.userId)
          }
        }
      }
    });
    res.status(200).json({ bug: curBug });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const deAssignUserBug = async (req, res) => {
  try {
    const curBug = await prisma.bug.update({
      where: {
        id: Number(req.params['id'])
      },
      data: {
        assignedUsers: {
          disconnect: {
            id: parseInt(req.body.userId)
          }
        }
      }
    });
    res.status(200).json({ bug: curBug });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
