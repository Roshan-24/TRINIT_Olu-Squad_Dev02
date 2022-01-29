import { check } from 'express-validator';
import validate from '.';
import prisma from '../config/prismaClient';

export const orgNameValidator = [
  check('name').custom(async name => {
    const org = await prisma.organization.findUnique({ where: { name } });
    if (org) throw new Error('Organization name already exists!');
  }),
  validate
];
