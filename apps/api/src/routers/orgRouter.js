import express from 'express';
import { jwtAuthGuard } from '../controllers/authController';
import {
  createNewOrg,
  listUserOrgs,
  getOrgById,
  makeOrgAdmin,
  addUserToOrg,
  removeFromOrg
} from '../controllers/orgController';

const orgRouter = express.Router();

orgRouter.post('/new', jwtAuthGuard, createNewOrg);

orgRouter.get('/user', jwtAuthGuard, listUserOrgs);

orgRouter.get('/:orgId', jwtAuthGuard, getOrgById);

orgRouter.post('/:orgId/makeOwner', jwtAuthGuard, makeOrgAdmin);

orgRouter.post('/:orgId/add', jwtAuthGuard, addUserToOrg);

orgRouter.post('/:orgId/remove', jwtAuthGuard, removeFromOrg);

export default orgRouter;
