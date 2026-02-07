import { sequelize } from '../../../../config/db.js';
import { DataTypes } from 'sequelize';

const ProjectInvitation = sequelize.define(
    'ProjectInvitation',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Primary key for the project invitation'
        },

        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key referencing the project'
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Name of the invited user'
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Email address of the invited user'
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Foreign key referencing the user'
        },

        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: 'Unique token for accepting the invitation'
        },

        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Expiration date of the invitation'
        },

        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'expired'),
            allowNull: false,
            defaultValue: 'pending',
            comment: 'Status of the invitation'
        },

        action_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Timestamp when the invitation was accepted or rejected'
        },

        invited_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: 'Timestamp when the invitation was sent'
        },

        invited_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'User ID of the user who sent the invitation'
        }
    },
    {
        tableName: 'project_invitations',
        paranoid: true,
        indexes: [
            { fields: ['project_id'] },
            { fields: ['name'] },
            { fields: ['email'] }
        ]
    }
);

export default ProjectInvitation;