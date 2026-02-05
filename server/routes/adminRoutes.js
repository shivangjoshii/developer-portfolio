const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectModel');

// Middleware to check admin authentication
const adminAuth = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
  next();
};

// Apply admin auth to all routes
router.use(adminAuth);

// Create new project
router.post('/projects', async (req, res) => {
  try {
    const { name, description, tools, role, code, demo, image, featured } = req.body;

    // Validate required fields
    if (!name || !description || !tools || !role || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Get the highest order number
    const lastProject = await Project.findOne().sort({ order: -1 });
    const newOrder = (lastProject?.order || 0) + 1;

    const project = new Project({
      name,
      description,
      tools,
      role,
      code,
      demo,
      image,
      featured,
      order: newOrder,
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message,
    });
  }
});

// Update project
router.put('/projects/:id', async (req, res) => {
  try {
    const { name, description, tools, role, code, demo, image, featured, status } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        tools,
        role,
        code,
        demo,
        image,
        featured,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message,
    });
  }
});

// Delete project
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message,
    });
  }
});

// Get all projects (including drafts and archived)
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message,
    });
  }
});

// Reorder projects
router.patch('/projects/reorder', async (req, res) => {
  try {
    const { projects } = req.body;

    if (!Array.isArray(projects)) {
      return res.status(400).json({
        success: false,
        message: 'Projects must be an array',
      });
    }

    // Update order for each project
    for (let i = 0; i < projects.length; i++) {
      await Project.findByIdAndUpdate(
        projects[i]._id,
        { order: i },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Projects reordered successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering projects',
      error: error.message,
    });
  }
});

module.exports = router;
