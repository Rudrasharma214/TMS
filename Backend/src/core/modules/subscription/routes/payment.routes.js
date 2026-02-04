import express from 'express';
import { PaymentController } from '../controllers/payment.controller.js';
import { PaymentService } from '../services/payment.service.js';

const paymentRoutes = express.Router();

const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);

/**
 * Create a subscription for a user
 * Path : /api/subscriptions/payments/create-order
 */
paymentRoutes.post('/create-order', paymentController.createPaymentOrder);


export default paymentRoutes;