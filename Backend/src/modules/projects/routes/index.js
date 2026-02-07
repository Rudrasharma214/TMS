import express from 'express';
import projectRoutes from './Workspace/project.routes.js';
import projectMemberRouter from './Workspace/projectMember.routes.js';

const projectsRouter = express.Router();

/**
 * @route   /api/projects/:projectId/members
 * @desc    Router for managing project members (add/invite/remove/list)
 * @access  Protected (requires authentication)
 */
projectsRouter.use('/:projectId/members', projectMemberRouter);

/**
 * @route   /api/projects
 * @desc    Main router for project management module
 * @access  Protected (requires authentication)
 */
projectsRouter.use('/', projectRoutes);

export default projectsRouter;