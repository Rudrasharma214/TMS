import { sendResponse, sendErrorResponse } from "../../../../core/utils/response.js";
import { STATUS } from "../../../../core/constants/statusCodes.js";

export class ProjectMemberController {
    constructor(projectMemberService) {
        this.projectMemberService = projectMemberService;
        this.inviteMember = this.inviteMember.bind(this);
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
};