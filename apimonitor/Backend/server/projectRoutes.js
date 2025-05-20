import express from 'express'
const projectRouter = express.Router();
import Project from '../models/serviceModel.js'
import auth from '../middleware/auth.js'



projectRouter.post('/register', auth, async (req, res) => {
  try {
    const {
      name,
      description,
      baseURL,
      trackErrors = true,
      trackLatency = true,
      sampleRate = 1.0,
      errorRateThreshold = 5,
      slowResponseThreshold = 1000,
      excludeRoutes = '',
      excludePatterns = ''
    } = req.body;

    // Validate required fields
    if (!name || !baseURL) {
      return res.status(400).json({ error: 'Name and baseURL are required' });
    }


    // Create the project with properly structured monitoringConfig
    const project = new Project({
      name,
      description,
      baseURL,
      user: req.userId,
      monitoringConfig: {
        trackErrors,
        trackLatency,
        sampleRate: parseFloat(sampleRate),
        alertThresholds: {
          errorRate: parseInt(errorRateThreshold),
          slowResponse: parseInt(slowResponseThreshold)
        },
        excludeRoutes: excludeRoutes ?
          excludeRoutes.split(',').map(r => r.trim()).filter(r => r) : [],
        excludePatterns: excludePatterns ?
          excludePatterns.split(',').map(p => p.trim()).filter(p => p) : []
      }
    });

    // Validate the project before saving
    await project.validate();

    // Save to database
    await project.save();

    res.status(201).json({
      message: 'Project registered successfully',
      status: 200

    });

  } catch (err) {
    console.error('Project registration error:', err);

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: err.errors
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
});

projectRouter.get('/getprojects', auth, async (req, res) => {
  try {

    const projects = await Project.find({ user: req.userId });
    res.json(projects);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' });
  }
});

projectRouter.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});




// Add this new route to your projectRouter.js
projectRouter.get('/config/:projectId', async (req, res) => {
  console.log('request for project config')
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Transform project data into npm module config format
    const config = {
      projectId: project._id,
      sampleRate: project.monitoringConfig.sampleRate,
      trackErrors: project.monitoringConfig.trackErrors,
      trackLatency: project.monitoringConfig.trackLatency,
      alertThresholds: project.monitoringConfig.alertThresholds,
      excludeRoutes: project.monitoringConfig.excludeRoutes,
      excludePatterns: project.monitoringConfig.excludePatterns,
      baseURL: project.baseURL,
      // Add any other relevant configs
      updatedAt: project.updatedAt
    };

    res.json(config);

  } catch (err) {
    console.error('Config fetch error:', err);
    res.status(500).json({
      error: 'Failed to fetch project config',
      message: err.message
    });
  }
});

export default projectRouter;