import express from 'express';
import { jwtAuthGuard } from '../controllers/authController';
import { createNewOrg } from '../controllers/orgController';

const orgRouter = express.Router();

orgRouter.post('/new', jwtAuthGuard, createNewOrg);

export default orgRouter;
