import express from 'express';

import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/roleMiddleware.js';

const router = express.Router();

// Protected route
router.get('/protected', protect, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user,
  });
});

// Admin-only route
router.get(
  '/admin',
  protect,
  adminOnly,
  (req, res) => {
    res.json({
      message: 'Admin route accessed',
    });
  }
);

export default router;