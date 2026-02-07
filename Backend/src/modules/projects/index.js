/**
 * Project Management Module
 * Export router of the project management module
 * @module projects
 * @author Rudra Sharma
 * @version 1.0.0
 * @description This module handles all project-related operations, including project creation, management, and collaboration.
 */
export { projectsRouter } from './routes/index.js';

/**
 * Bind all associations in the project management module
 * @module projects
 * @author Rudra Sharma
 * @version 1.0.0
 * @description Initializes all database associations for the project module
 */
import { WorkspaceAssociations } from './models/Workspace/associations.js';

export const ProjectAssociations = () => {
    WorkspaceAssociations.associate();
};