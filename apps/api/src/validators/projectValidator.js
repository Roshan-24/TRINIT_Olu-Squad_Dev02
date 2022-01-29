import { check } from 'express-validator';
import validate from '.';
import prisma from '../config/prismaClient';

export const projectNameValidator = [
  check('name').custom(async (name, { req }) => {
    const project = await prisma.project.findUnique({
      where: {
        organizationId_name: { organizationId: req.body.organizationId, name }
      }
    });
    if (project)
      throw new Error('Project with the name already exists in organization!');
  }),
  validate
];
