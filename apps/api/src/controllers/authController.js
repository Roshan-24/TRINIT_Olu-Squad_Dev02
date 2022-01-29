import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import crypto from 'crypto';
import prisma from '../config/prismaClient';
import LocalStrategy from '../auth/local-strategy';
import JwtStrategy from '../auth/jwt-strategy';

const signJwt = payload => jwt.sign(payload, process.env.JWT_SECRET);

export const localAuthGuard = passport.authenticate(LocalStrategy, {
  session: false
});

export const jwtAuthGuard = passport.authenticate(JwtStrategy, {
  session: false
});

export const verifyPassword = async (user, password) =>
  await bcrypt.compare(password, user.password);

export const login = (req, res) => {
  try {
    const payload = {
      ...req.user,
      hashedEmail: crypto.createHash('md5').update(req.user.email).digest('hex')
    };

    return res.json({ accessToken: signJwt(payload) });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const register = async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    });

    return res.json({ message: 'User successfully created' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};
