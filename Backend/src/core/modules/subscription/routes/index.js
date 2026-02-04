import express from 'express';
import planRoutes from './plan.routes.js';

const subscriptionRoutes = express.Router();

/**
 * Mount plan routes
 * Path: /api/subscriptions/plans
 */
subscriptionRoutes.use('/plans', planRoutes);

export default subscriptionRoutes;