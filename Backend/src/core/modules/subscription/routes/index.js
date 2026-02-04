import express from 'express';
import planRoutes from './plan.routes.js';
import paymentRoutes from './payment.routes.js';
import subscriptionRoutes from './subscription.routes.js';

const subscriptionRouter = express.Router();

/**
 * Mount plan routes
 * Path: /api/subscriptions/plans
 */
subscriptionRouter.use('/plans', planRoutes);

/**
 * Payment Routes
 * Path: /api/subscriptions/payments
 */
subscriptionRouter.use('/payments', paymentRoutes);

/**
 * Create a new subscription
 * Path : /api/subscriptions
 */
subscriptionRouter.post('/', subscriptionRoutes)

export default subscriptionRouter;