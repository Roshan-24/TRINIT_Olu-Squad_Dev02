import prisma from '../config/prismaClient';

export const createNewProject = (req, res) => {
  try {
    const project = await prisma.project.create({
      data: {
        name: req.projectName
      }
    });
    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
