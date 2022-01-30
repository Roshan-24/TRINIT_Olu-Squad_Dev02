import prisma from '../config/prismaClient';

export const createNewProject = async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        organization: {
          connect: {
            id: parseInt(req.body.orgId)
          }
        },
        admins: {
          connect: {
            id: parseInt(req.user.id)
          }
        },
        members: {
          connect: {
            id: parseInt(req.user.id)
          }
        }
      }
    });
    const bugCategory = await prisma.bugCategory.create({
      data: {
        name: 'PENDING',
        project: {
          connect: {
            id: parseInt(project.id)
          }
        }
      }
    });
    return res.status(201).json({ project });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const listOrgProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        organizationId: parseInt(req.params.orgId)
      }
    });
    return res.status(200).json({ projects });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const curProject = await prisma.project.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        organization: true,
        bugCategories: {
          include: {
            Bug: true
          }
        },
        admins: true,
        members: true
      }
    });
    if (curProject) res.json({ data: curProject });
    else return;
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Project not found' });
  }
};

export const createNewList = async (req, res) => {
  try {
    const { listName, projectId } = req.body;
    const bugCategory = await prisma.bugCategory.create({
      data: {
        name: listName,
        project: {
          connect: {
            id: parseInt(projectId)
          }
        }
      }
    });
    res.status(201).json({ bugCategory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const searchProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        name: {
          contains: req.query.q
        }
      }
    });
    return res.status(200).json({ projects });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const addUserToProject = async (req, res) => {
  try {
    await prisma.project.update({
      where: { id: parseInt(req.params.orgId) },
      data: {
        members: {
          connect: {
            email: req.body.email
          }
        }
      }
    });
    return res.status(200).json({ message: 'User added to project' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const makeProjectAdmin = async (req, res) => {
  try {
    await prisma.project.update({
      where: { id: parseInt(req.params.orgId) },
      data: {
        admins: {
          connect: {
            id: req.body.userId
          }
        }
      }
    });
    return res.status(200).json({ message: 'User added to project' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const removeFromProject = async (req, res) => {
  try {
    await prisma.project.update({
      where: { id: parseInt(req.params.orgId) },
      data: {
        members: {
          disconnect: {
            id: req.body.userId
          }
        }
      }
    });
    return res.status(200).json({ message: 'User removed from project' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};
