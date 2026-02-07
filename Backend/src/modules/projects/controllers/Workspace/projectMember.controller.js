import { sendResponse, sendErrorResponse } from '../../../../core/utils/response.js';
import { STATUS } from '../../../../core/constants/statusCodes.js';

export class ProjectMemberController {
    constructor(projectMemberService) {
        this.projectMemberService = projectMemberService;
        this.inviteMember = this.inviteMember.bind(this);
        this.acceptInvitation = this.acceptInvitation.bind(this);
        this.rejectInvitation = this.rejectInvitation.bind(this);
    };

    /* Invite an member */
    async inviteMember(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { projectId } = req.params;
            const { email } = req.body;

            const invitation = await this.projectMemberService.inviteMember(
                projectId,
                email,
                userId
            );

            if(!invitation) {
                return sendErrorResponse(res, invitation.statusCode, invitation.message, invitation.errors);
            }

            return sendResponse(res, STATUS.CREATED, invitation.message, invitation.data);
        } catch (error) {
            next(error);
        }
    };

    /* Accept a project invitation */
    async acceptInvitation(req, res, next) {
        try {
            const { token, email, projectId } = req.body;

            const result = await this.projectMemberService.acceptInvitation(
                token,
                email,
                parseInt(projectId)
            );

            if(!result) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            return sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    }

    /* Reject a project invitation */
    async rejectInvitation(req, res, next) {
        try {
            const { token, email, projectId } = req.body;

            const result = await this.projectMemberService.rejectInvitation(
                token,
                email,
                parseInt(projectId)
            );

            if(!result) {
                return sendErrorResponse(res, result.statusCode, result.message, result.errors);
            }

            return sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    }
};