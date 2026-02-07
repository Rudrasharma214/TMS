import { sequelize } from '../../../../config/db.js';
import { DataTypes } from 'sequelize';

const Project = sequelize.define(
    'Project',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Primary key for the project'
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Name of the project'
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Description of the project'
        },

        status: {
            type: DataTypes.ENUM('active', 'inactive', 'in_progress', 'completed'),
            allowNull: false,
            defaultValue: 'inactive',
            comment: 'Status of the project'
        },

        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Start date of the project'
        },

        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'End date of the project'
        },

        completed_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Timestamp when the project was marked as completed'
        },

        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Owner ID of the user who created the project'
        },

        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'User ID of the last user who updated the project'
        }
    },
    {
        tableName: 'projects',
        paranoid: true,
        indexes: [
            { fields: ['name'] },
            { fields: ['status'] },
            { fields: ['created_by'] }
        ]
    }
);

export default Project;