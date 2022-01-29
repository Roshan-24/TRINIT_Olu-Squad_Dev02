import express from 'express';
import { createNewBug } from '../controllers/bugController';
import { jwtAuthGuard } from '../controllers/authController';

const bugRouter = express.Router();

bugRouter.post('/new', jwtAuthGuard, createNewBug);

export default bugRouter;
