import express from 'express';
import { authenticate } from '../../../../core/modules/auth/middlewares/auth.middleware.js';
import { validate } from '../../../../core/middlewares/validate.middleware.js';


const projectMemberRouter = express.Router({ mergeParams: true });

/**
 * @route   POST /api/projects/:projectId/members
 * @desc    Send an invitation to a user to join the project as a member
 * @access  Protected (requires authentication)
 */
projectMemberRouter.post(
    '/',
    validate(projectMemberInviteSchema),
    inviteMember
);

export default projectMemberRouter;