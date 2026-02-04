import express from 'express';
import { SubscriptionController } from '../controllers/subscription.controller.js';
import { SubscriptionService } from '../services/subscription.service.js';
import { authenticate } from '../../auth/middlewares/auth.middleware.js';
import { validate } from "../../../middlewares/validate.middleware.js";
import { 
    subscriptionSchema
} from '../validations/subscription.validation.js';
const subscriptionRoutes = express.Router();

const subscriptionService = new SubscriptionService();
const subscriptionController = new SubscriptionController(subscriptionService);

subscriptionRoutes.use(authenticate);

/** 
 * Create a new subscription
 * Path : /api/subscriptions
 */
subscriptionRoutes.post(
    '/',
    validate(subscriptionSchema),
    subscriptionController.createSubscription
);

/**
 * Get My Subscription
 * Path : /api/subscriptions
 */
subscriptionRoutes.get(
    '/',
    subscriptionController.getMySubscription
);


export default subscriptionRoutes;