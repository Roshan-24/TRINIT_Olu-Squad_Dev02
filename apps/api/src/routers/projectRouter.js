import express from 'express';
import {
  getProjectById,
  createNewProject,
  listOrgProjects,
  createNewList
} from '../controllers/projectController';
import { jwtAuthGuard } from '../controllers/authController';

const projectRouter = express.Router();

projectRouter.get('/:id', getProjectById);

projectRouter.post('/new', jwtAuthGuard, createNewProject);

projectRouter.get('/getByOrgId/:orgId', jwtAuthGuard, listOrgProjects);

projectRouter.post('/newBugCategory', jwtAuthGuard, createNewList);

projectRouter.get('/', jwtAuthGuard, listOrgProjects);

export default projectRouter;
