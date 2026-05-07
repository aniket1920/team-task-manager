import Project from '../models/Project.js';

export const createProject =
  async (req, res) => {
    try {
      const {
        name,
        description,
        members,
      } = req.body;

      const project =
        await Project.create({
          name,
          description,
          members,
          createdBy: req.user.id,
        });

      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getProjects =
  async (req, res) => {
    try {
      let projects;

      if (
        req.user.role === 'admin'
      ) {
        projects =
          await Project.find().populate(
            'members',
            'name email'
          );
      } else {
        projects =
          await Project.find({
            members: req.user.id,
          }).populate(
            'members',
            'name email'
          );
      }

      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateProject =
  async (req, res) => {
    try {
      const project =
        await Project.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteProject =
  async (req, res) => {
    try {
      await Project.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          'Project deleted',
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };