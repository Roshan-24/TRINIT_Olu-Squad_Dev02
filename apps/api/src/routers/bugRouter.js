import express from 'express';
import {
  createNewBug,
  getBugById,
  editBug,
  approveBug,
  assignUserBug,
  deAssignUserBug
} from '../controllers/bugController';
import { jwtAuthGuard } from '../controllers/authController';

const bugRouter = express.Router();

bugRouter.post('/new', jwtAuthGuard, createNewBug);

bugRouter.get('/:id', getBugById);
bugRouter.post('/:id/status', approveBug);
bugRouter.post('/:id/assign', assignUserBug);
bugRouter.post('/:id/deassign', deAssignUserBug);

bugRouter.put('/:id', jwtAuthGuard, editBug);

export default bugRouter;
