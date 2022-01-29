import express from 'express';
import { jwtAuthGuard } from '../controllers/authController';
import {
  createNewOrg,
  listUserOrgs,
  getOrgById
} from '../controllers/orgController';

const orgRouter = express.Router();

orgRouter.post('/new', jwtAuthGuard, createNewOrg);

orgRouter.get('/', jwtAuthGuard, listUserOrgs);

orgRouter.get('/:orgId', jwtAuthGuard, getOrgById);

export default orgRouter;
