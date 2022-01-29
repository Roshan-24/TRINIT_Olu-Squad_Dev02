import express from 'express';
import { createNewBug, getBugById } from '../controllers/bugController';
import { jwtAuthGuard } from '../controllers/authController';

const bugRouter = express.Router();

bugRouter.post('/new', jwtAuthGuard, createNewBug);
bugRouter.get('/:id', getBugById);

export default bugRouter;
