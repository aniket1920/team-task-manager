import express from 'express';
import Project from '../models/Project.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


// GET ALL PROJECTS
router.get('/', authMiddleware, async (req, res) => {
  try {
    let projects;

    // Admin sees all projects
    if (req.user.role === 'admin') {
      projects = await Project.find().populate(
        'members',
        'name email'
      );
    }

    // Member sees only assigned projects
    else {
      projects = await Project.find({
        members: req.user.id,
      }).populate('members', 'name email');
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// CREATE PROJECT (ADMIN ONLY)
router.post('/', authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Only admin can create projects',
      });
    }

    const { name, description } = req.body;

    const newProject = await Project.create({
      name,
      description,
      members: [],
      createdBy: req.user.id,
    });

    res.status(201).json(newProject);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE PROJECT
router.delete('/:id', authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Only admin can delete projects',
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Project deleted',
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;