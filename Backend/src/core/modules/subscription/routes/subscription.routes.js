import express from 'express';
import { SubscriptionController } from '../controllers/subscription.controller.js';
import { SubscriptionService } from '../services/subscription.service.js';

const subscriptionRoutes = express.Router();

const subscriptionService = new SubscriptionService();
const subscriptionController = new SubscriptionController(subscriptionService);

/** 
 * Create a new subscription
 * Path : /api/subscriptions/
 */
subscriptionRoutes.post('/', subscriptionController.createSubscription);

export default subscriptionRoutes;