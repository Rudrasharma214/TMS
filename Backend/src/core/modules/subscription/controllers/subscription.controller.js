import { STATUS } from "../../../constants/statusCodes.js";
import { sendErrorResponse, sendResponse } from "../../../utils/response.js";

export class SubscriptionController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
        this.createSubscription = this.createSubscription.bind(this);
        this.getMySubscription = this.getMySubscription.bind(this);
    }

    /* Create Subscription */
    async createSubscription(req, res, next) {
        try {
            const { id: user_id } = req.user;
            const subscriptionData = req.body;

            const result = await this.subscriptionService.createSubscription(user_id, subscriptionData);

            if(!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.error);
            }

            return sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };

    /* Get My Subscription */
    async getMySubscription(req, res, next) {
        try {
            const { id: user_id } = req.user;

            const result = await this.subscriptionService.getMySubscription(user_id);

            if(!result.success) {
                return sendErrorResponse(res, result.statusCode, result.message, result.error);
            }

            return sendResponse(res, STATUS.OK, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };
};