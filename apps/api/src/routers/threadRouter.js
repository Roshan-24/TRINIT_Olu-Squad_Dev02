import express from 'express';
import { jwtAuthGuard } from '../controllers/authController';
import { createNewThread } from '../controllers/threadController';

const threadRouter = express.Router();

threadRouter.post('/new', jwtAuthGuard, createNewThread);

export default threadRouter;
