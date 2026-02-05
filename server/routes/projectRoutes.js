const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectModel');

// Get all active projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ status: 'active' })
      .sort({ featured: -1, order: 1, createdAt: -1 });
    
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

// Get single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message,
    });
  }
});

// Get featured projects only
router.get('/featured/projects', async (req, res) => {
  try {
    const projects = await Project.find({ status: 'active', featured: true })
      .sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured projects',
      error: error.message,
    });
  }
});

module.exports = router;
