import { Strategy, ExtractJwt } from 'passport-jwt';
import prisma from '../config/prismaClient';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: true,
  secretOrKey: process.env.JWT_SECRET
};

const JwtStrategy = new Strategy(options, async (payload, cb) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email }
  });
  if (!user) return cb(null, false);
  const { password, ...result } = user;
  return cb(null, result);
});

export default JwtStrategy;
