import express from 'express';
import { localAuthGuard, login, register } from '../controllers/authController';
import { registerUserValidator } from '../validators/authValidator';

const authRouter = express.Router();

authRouter.post('/login', localAuthGuard, login);

authRouter.post('/register', registerUserValidator, register);

export default authRouter;
