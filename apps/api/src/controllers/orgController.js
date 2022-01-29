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
