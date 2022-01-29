import express from 'express';
import { getProjectById, createNewProject, listOrgProjects } from '../controllers/projectController';
import { jwtAuthGuard } from '../controllers/authController';

const projectRouter = express.Router();

projectRouter.get('/:id', getProjectById);

projectRouter.post('/new', jwtAuthGuard, createNewProject);

projectRouter.get('/getByOrgId', jwtAuthGuard, listOrgProjects);

export default projectRouter;
