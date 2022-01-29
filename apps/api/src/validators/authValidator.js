import { check } from 'express-validator';
import prisma from '../config/prismaClient';
import validate from '.';

export const registerUserValidator = [
  check('firstName').exists().withMessage('First name cannot be empty'),
  check('lastName').exists().withMessage('Last name cannot be empty'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .custom(async email => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) throw new Error('Email already in use');
    }),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password should be atleast 6 characters long'),
  validate
];
