import { sequelize } from "../../../../config/db.js";
import { STATUS } from "../../../../core/constants/statusCodes.js";
import projectNames from "../../../../core/events/eventNames/projectNames.js";
import { publishEvent } from "../../../../core/events/eventPublisher.js";
import { UserRepository } from "../../../../core/modules/auth/repositories/user.repositories.js";
import { ProjectRepository } from "../../repositories/Workspace/project.repositories.js";
import { ProjectMemberRepository } from "../../repositories/Workspace/projectMember.repositories.js";
import { generateInviteToken } from "../../utils/inviteToken.utils.js";

const userRepository = new UserRepository();
const projectRepository = new ProjectRepository();
const projectMemberRepository = new ProjectMemberRepository();

export class ProjectMemberService {
    
    /* Invite a member to a project */
    async inviteMember(projectId, email, userId) {
        const transaction = await sequelize.transaction();
        try {
            const project = await projectRepository.getProjectByPk(projectId, transaction)
            if(!project) {
                await transaction.rollback();
                return {
                    success: false,
                    message: 'Project not found',
                    statusCode: STATUS.NOT_FOUND,
                }
            };
            
            const existingInvitation = await projectMemberRepository.findInvitationByEmailAndProjectId(email, projectId, transaction);
            if(existingInvitation) {
                await transaction.rollback();
                return {
                    success: false, 
                    message: 'An invitation has already been sent to this email for the project',
                    statusCode: STATUS.BAD_REQUEST,
                }
            };

            // Owner User
            const user = await userRepository.findById(userId, transaction);
            // Invited User
            const isUser = await userRepository.findByEmail(email, transaction);
            const isUserId = isUser ? isUser.id : null;
            
            const token = generateInviteToken(projectId, email);
            const data = {
                project_id: projectId,
                user_id: isUserId,
                email,
                token,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                status: 'pending',
                invited_at: new Date(),
                invited_by: userId
            };

            const invitation = await projectMemberRepository.createProjectInvitation(data, { transaction });

            await transaction.commit();
            
            publishEvent(projectNames.INVITE_MEMBER, { 
                token, 
                email, 
                projectName: project.name, 
                userName: user.name, 
                invitedUserName: isUserId ? isUser.name : null 
            });

            return {
                success: true,
                message: 'Member invited successfully',
                data: invitation,
                statusCode: STATUS.OK,
            };
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                message: 'Failed to invite member to the project',
                errors: error.message,
                statusCode: STATUS.INTERNAL_ERROR,
            }
        }
    };
};