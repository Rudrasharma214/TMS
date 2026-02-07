import Project from './project.model.js';
import ProjectMember from './projectMember.model.js';
import ProjectInvitation from './projectInvitation.model.js';
import User from '../../../../core/modules/auth/models/user.model.js';

export class WorkspaceAssociations {
    static associate() {
        // Project belongs to User (owner)
        Project.belongsTo(User, {
            foreignKey: 'created_by',
            as: 'owner'
        });

        // User has many Projects (as owner)
        User.hasMany(Project, {
            foreignKey: 'created_by',
            as: 'owned_projects'
        });

        // Project has many ProjectMembers
        Project.hasMany(ProjectMember, {
            foreignKey: 'project_id',
            as: 'members'
        });

        // ProjectMember belongs to Project
        ProjectMember.belongsTo(Project, {
            foreignKey: 'project_id',
            as: 'project'
        });

        // ProjectMember belongs to User
        ProjectMember.belongsTo(User, {
            foreignKey: 'user_id',
            as: 'user'
        });

        // ProjectInvitation belongs to Project
        ProjectInvitation.belongsTo(Project, {
            foreignKey: 'project_id',
            as: 'project'
        });

        // Project has many ProjectInvitations
        Project.hasMany(ProjectInvitation, {
            foreignKey: 'project_id',
            as: 'invitations'
        });
    }
}