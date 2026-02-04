import express from 'express';
import { PlanController } from '../controllers/plan.controller.js';
import { PlanService } from '../services/plan.service.js';
import { adminAuthenticate } from '../../auth/middlewares/auth.middleware.js';

const planService = new PlanService();
const planController = new PlanController(planService);

const planRoutes = express.Router();

/**
 * Route to get all plans. Accessible to all users.
 * Path: /api/subscription/plans
 */
planRoutes.get('/', planController.getAllPlans);

/**
 * Route to create a new plan. Accessible only to admin users.
 */
planRoutes.use(adminAuthenticate);

/**
 * Route to create a new plan. Accessible only to admin users.
 * Path: /api/subscription/plans
 */
planRoutes.post('/', planController.createPlan);

/**
 * Route to update an existing plan. Accessible only to admin users.
 * Path: /api/subscription/plans/:id
 */
planRoutes.put('/:id', planController.updatePlan);

/**
 * Route to deactivate a plan. Accessible only to admin users.
 * Path: /api/subscription/plans/:id
 */
planRoutes.delete('/:id', planController.deactivatePlan);


export default planRoutes;