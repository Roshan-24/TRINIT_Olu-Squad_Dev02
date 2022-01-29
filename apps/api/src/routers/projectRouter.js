import express from 'express';
import { jwtAuthGuard } from '../controllers/authController';
import {
  createNewProject,
  listOrgProjects
} from '../controllers/projectController';

const projectRouter = express.Router();

projectRouter.post('/new', jwtAuthGuard, createNewProject);

projectRouter.get('/', jwtAuthGuard, listOrgProjects);

export default projectRouter;
