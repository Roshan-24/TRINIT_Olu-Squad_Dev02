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
    const organizations = await prisma.organization.findMany({
      where: {
        OR: [
          {
            owners: {
              some: { id: req.user.id }
            }
          },
          {
            members: {
              some: { id: req.user.id }
            }
          }
        ]
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

export const addUserToOrg = async (req, res) => {
  try {
    await prisma.organization.update({
      where: { id: parseInt(req.params.orgId) },
      data: {
        members: {
          connect: {
            email: req.body.email
          }
        }
      }
    });
    return res.status(200).json({ message: 'User added to organization' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const makeOrgAdmin = async (req, res) => {
  try {
    await prisma.organization.update({
      where: { id: parseInt(req.params.orgId) },
      data: {
        owners: {
          connect: {
            id: req.body.userId
          }
        }
      }
    });
    return res.status(200).json({ message: 'User added to organization' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const removeFromOrg = async (req, res) => {
  try {
    await prisma.organization.update({
      where: { id: parseInt(req.params.orgId) },
      data: {
        members: {
          disconnect: {
            id: req.body.userId
          }
        }
      }
    });
    return res.status(200).json({ message: 'User removed from organization' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};
