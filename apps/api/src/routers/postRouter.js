import express from 'express';
import { createNewPost } from '../controllers/postController';
import { jwtAuthGuard } from '../controllers/authController';

const postRoouter = express.Router();

postRouter.post('/new', jwtAuthGuard, createNewPost);

export default postRouter;
