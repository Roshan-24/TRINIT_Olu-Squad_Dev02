import { Strategy } from 'passport-local';
import prisma from '../config/prismaClient';
import { verifyPassword } from '../controllers/authController';

const options = {
  usernameField: 'email',
  passwordField: 'password'
};

const LocalStrategy = new Strategy(options, async (email, passwd, cb) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(user, passwd))) return cb(null, false);
  const { password, ...result } = user;
  return cb(null, result);
});

export default LocalStrategy;
