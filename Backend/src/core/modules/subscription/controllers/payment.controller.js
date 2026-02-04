import { STATUS } from "../../../constants/statusCodes.js";
import { sendErrorResponse, sendResponse } from "../../../utils/response.js";

export class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.createPaymentOrder = this.createPaymentOrder.bind(this);
    }

    /* Create Payment Order */
    async createPaymentOrder(req, res, next) {
        try {
            const { subscriptionId } = req.body;
            const { id: userId } = req.user;

            const result = await this.paymentService.createPaymentOrder(userId, subscriptionId);
            if(!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.error);
            }

            sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Handle Razorpay Webhook */
    async handleWebhook(req, res, next) {
        try {
            const signature = req.headers['x-razorpay-signature'];
            const webhookBody = req.rawBody;

            if (!signature || !webhookBody) {
                return sendErrorResponse(res, STATUS.BAD_REQUEST, "Missing webhook signature or body");
            }

            const result = await this.paymentService.handlePaymentWebhook(webhookBody, signature);
            
            if (!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.error);
            }

            sendResponse(res, result.statusCode, result.message);
        } catch (error) {
            next(error);
        }
    };
};