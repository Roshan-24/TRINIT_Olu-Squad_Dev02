import express from 'express';
import { createNewOrg } from '../controllers/orgController';

const orgRouter = express.Router();

orgRouter.post('/new', createNewOrg);
