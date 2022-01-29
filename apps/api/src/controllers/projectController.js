import prisma from '../config/prismaClient';

export const createNewProject = async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: {
        name: req.projectName,
        admins: [req.user.id]
      }
    });
    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const listOrgProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        organizationId: parseInt(req.query.orgId)
      }
    });
    res.status(200).json({ projects });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
