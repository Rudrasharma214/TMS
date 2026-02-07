import { sequelize } from '../../../../config/db.js';
import { DataTypes } from 'sequelize';

const ProjectMember = sequelize.define(
    'ProjectMember',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Primary key for the project member'
        },

        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key referencing the project'
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key referencing the user'
        },

        role: {
            type: DataTypes.ENUM('owner', 'admin', 'member'),
            allowNull: false,
            defaultValue: 'member',
            comment: 'Role of the user in the project'
        },

        added_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'User ID of the user who added the member to the project'
        }
    },
    {
        tableName: 'project_members',
        paranoid: true,
        indexes: [
            { fields: ['project_id'] },
            { fields: ['user_id'] },
            { fields: ['role'] },
            {  fields: ['user_id', 'project_id'], unique: true }
        ]
    }
);

export default ProjectMember;