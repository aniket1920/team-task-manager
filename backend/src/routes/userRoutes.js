import express from 'express';

import { getMembers } from '../controllers/userController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/members',
  authMiddleware,
  getMembers
);

export default router;