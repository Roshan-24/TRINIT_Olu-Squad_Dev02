import express from 'express';
import { createNewProject } from '../controllers/projectController';

const projectRouter = express.Router();

projectRouter.post('/new', createNewProject);
