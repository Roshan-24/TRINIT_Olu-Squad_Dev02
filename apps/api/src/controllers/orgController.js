import prisma from '../config/prismaClient';

export const createNewOrg = async (req, res) => {
  try {
    const organization = await prisma.organization.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        owners: {
          connect: {
            id: req.user.id
          }
        },
        members: {
          connect: {
            id: req.user.id
          }
        }
      }
    });
    return res.status(201).json({ organization });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong!' });
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
    return res.status(200).json({ organizations });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const getOrgById = async (req, res) => {
  console.log(req.query.orgId);
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: parseInt(req.params.orgId) },
      include: {
        owners: true,
        members: true
      }
    });
    return res.status(200).json({ organization });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};
