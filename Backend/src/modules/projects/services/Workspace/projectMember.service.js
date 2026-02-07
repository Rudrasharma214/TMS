import { sequelize } from '../../../../config/db.js';
import { STATUS } from '../../../../core/constants/statusCodes.js';
import projectNames from '../../../../core/events/eventNames/projectNames.js';
import { publishEvent } from '../../../../core/events/eventPublisher.js';
import { UserRepository } from '../../../../core/modules/auth/repositories/user.repositories.js';
import { ProjectRepository } from '../../repositories/Workspace/project.repositories.js';
import { ProjectInvitationRepository } from '../../repositories/Workspace/projectInvitation.repositories.js';
import { ProjectMemberRepository } from '../../repositories/Workspace/projectMember.repositories.js';
import { generateInviteToken, verifyInviteToken } from '../../utils/inviteToken.utils.js';

const userRepository = new UserRepository();
const projectRepository = new ProjectRepository();
const projectInvitationRepository = new ProjectInvitationRepository();
const projectMemberRepository = new ProjectMemberRepository();
export class ProjectMemberService {
    
    /* Invite a member to a project */
    async inviteMember(projectId, email, userId) {
        const transaction = await sequelize.transaction();
        try {
            const project = await projectRepository.getProjectByPk(projectId, transaction);
            if(!project) {
                await transaction.rollback();
                return {
                    success: false,
                    message: 'Project not found',
                    statusCode: STATUS.NOT_FOUND
                };
            };
            
            const existingInvitation = await projectInvitationRepository.findInvitationByEmailAndProjectId(email, projectId, transaction);
            if(existingInvitation) {
                await transaction.rollback();
                return {
                    success: false, 
                    message: 'An invitation has already been sent to this email for the project',
                    statusCode: STATUS.BAD_REQUEST
                };
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

            const invitation = await projectInvitationRepository.createProjectInvitation(data, { transaction });

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
                statusCode: STATUS.OK
            };
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                message: 'Failed to invite member to the project',
                errors: error.message,
                statusCode: STATUS.INTERNAL_ERROR
            };
        }
    };

    /* Accept a project invitation */
    async acceptInvitation(token, email, projectId) {
        const transaction = await sequelize.transaction();
        try {
            await verifyInviteToken(token);
            const invitation = await projectInvitationRepository.findInvitationByEmailAndProjectId(email, projectId, transaction);
            if(!invitation || invitation.token !== token || invitation.status !== 'pending' || new Date() > invitation.expires_at) {
                await transaction.rollback();
                return {
                    success: false,
                    message: 'Invalid or expired invitation token',
                    statusCode: STATUS.BAD_REQUEST
                };
            }

            const project = await projectRepository.getProjectByPk(projectId, transaction);
            if(!project) {
                await transaction.rollback();
                return {
                    success: false,
                    message: 'Project not found',
                    statusCode: STATUS.NOT_FOUND
                };
            }
            const data = { 
                project_id: projectId, 
                user_id: invitation.user_id,
                role: 'member',
                added_by: invitation.invited_by
            };

            // Add the user to the project members
            await projectMemberRepository.createProjectMember(data, transaction);

            await projectInvitationRepository.updateInvitationStatus(invitation.id, 'accepted', transaction);

            await transaction.commit();

            return {
                success: true,
                message: 'Invitation accepted successfully',
                statusCode: STATUS.OK
            };
        } catch (error) {
            await transaction.rollback();
            return  {
                success: false,
                message: 'Failed to accept the project invitation',
                errors: error.message,
                statusCode: STATUS.INTERNAL_ERROR
            };
        }
    };

    /* Reject a project invitation */
    async rejectInvitation(token, email, projectId) {
        const transaction = await sequelize.transaction();
        try {
            await verifyInviteToken(token);
            const invitation = await projectInvitationRepository.findInvitationByEmailAndProjectId(email, projectId, transaction);
            if(!invitation || invitation.token !== token || invitation.status !== 'pending' || new Date() > invitation.expires_at) {
                await transaction.rollback();
                return {
                    success: false,
                    message: 'Invalid or expired invitation token',
                    statusCode: STATUS.BAD_REQUEST
                };
            }

            await projectInvitationRepository.updateInvitationStatus(invitation.id, 'rejected', transaction);

            await transaction.commit();

            return {
                success: true,
                message: 'Invitation rejected successfully',
                statusCode: STATUS.OK
            };            
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                message: 'Failed to reject the project invitation',
                errors: error.message,
                statusCode: STATUS.INTERNAL_ERROR
            };
        }
    };
};