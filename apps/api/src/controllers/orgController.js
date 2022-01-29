import prisma from '../config/prismaClient';

export const createNewOrg = async (req, res) => {
  try {
    const organization = await prisma.organization.create({
      data: {
        name: req.orgName,
        owners: [req.user.id]
      }
    });
    res.status(201).json({ organization });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const listUserOrgs = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const organizations = await prisma.organization.findMany({
      where: {
        owners: {
          every: {
            id: user.id
          }
        }
      },
      include: {
        _count: {
          select: {
            projects: true
          }
        }
      }
    });
    res.status(200).json({ organizations });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const getOrgById = async (req, res) => {
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: req.query.orgId }
    });
    res.status(200).json({ organization });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
