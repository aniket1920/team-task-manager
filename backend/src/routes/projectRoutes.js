import express from 'express';

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

import authMiddleware from '../middleware/authMiddleware.js';

import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  createProject
);

router.get(
  '/',
  authMiddleware,
  getProjects
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  updateProject
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  deleteProject
);

export default router;