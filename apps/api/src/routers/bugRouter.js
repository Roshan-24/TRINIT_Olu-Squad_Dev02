import express from 'express';
import {
  createNewBug,
  getBugById,
  editBug
} from '../controllers/bugController';
import { jwtAuthGuard } from '../controllers/authController';

const bugRouter = express.Router();

bugRouter.post('/new', jwtAuthGuard, createNewBug);

bugRouter.get('/:id', getBugById);

bugRouter.put('/:id', jwtAuthGuard, editBug);

export default bugRouter;
