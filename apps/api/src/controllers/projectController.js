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
        }
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
