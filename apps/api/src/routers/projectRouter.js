import express from 'express';
import {
  getProjectById,
  createNewProject,
  listOrgProjects,
  createNewList,
  searchProjects,
  makeProjectAdmin,
  addUserToProject,
  removeFromProject
} from '../controllers/projectController';
import { jwtAuthGuard } from '../controllers/authController';

const projectRouter = express.Router();

projectRouter.get('/:id', getProjectById);

projectRouter.post('/new', jwtAuthGuard, createNewProject);

projectRouter.get('/getByOrgId/:orgId', jwtAuthGuard, listOrgProjects);

projectRouter.post('/newBugCategory', jwtAuthGuard, createNewList);

projectRouter.get('/', jwtAuthGuard, listOrgProjects);

projectRouter.post('/search', searchProjects);

projectRouter.post('/:projectId/makeOwner', jwtAuthGuard, makeProjectAdmin);

projectRouter.post('/:projectId/add', jwtAuthGuard, addUserToProject);

projectRouter.post('/:projectId/remove', jwtAuthGuard, removeFromProject);

export default projectRouter;
