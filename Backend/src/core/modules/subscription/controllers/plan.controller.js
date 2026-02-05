import { STATUS } from "../../../constants/statusCodes.js";
import { sendErrorResponse, sendResponse } from "../../../utils/response.js";

export class PlanController {
    constructor(planService) {
        this.planService = planService;
        this.getAllPlans = this.getAllPlans.bind(this);
        this.createPlan = this.createPlan.bind(this);
        this.updatePlan = this.updatePlan.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
    }

    /* Get All Plans */
    async getAllPlans(req, res, next) {
        try {
            const { search } = req.query;

            const plans = await this.planService.getAllPlans(search);

            if(!plans.success) {
                return sendErrorResponse(res, plans.statusCode, plans.message, plans.errors);
            }

            sendResponse(res, STATUS.OK, plans.message, plans.data);
        } catch (error) {
            next(error);
        }
    };

    /* Create Plan */
    async createPlan(req, res, next) {  
        try {
            const planData = req.body;

            const newPlan = await this.planService.createPlan(planData);

            if(!newPlan.success) {
                return sendErrorResponse(res, newPlan.statusCode, newPlan.message, newPlan.errors);
            }

            sendResponse(res, STATUS.CREATED, newPlan.message, newPlan.data);
        } catch (error) {
            next(error);
        }
    };

    /* Update Plan */
    async updatePlan(req, res, next) {
        try {
            const { id } = req.params;
            const planData = req.body;

            if(!id) {
                return sendErrorResponse(res, STATUS.BAD_REQUEST, "Plan ID is required", null);
            }

            const updatedPlan = await this.planService.updatePlan(id, planData);

            if(!updatedPlan.success) {
                return sendErrorResponse(res, updatedPlan.statusCode, updatedPlan.message, updatedPlan.errors);
            }

            sendResponse(res, STATUS.OK, updatedPlan.message, updatedPlan.data);
        } catch (error) {
            next(error);
        }
    };

    /* Delete Plan */
    async deletePlan(req, res, next) {
        try {
            const { id } = req.params;
            if(!id) {
                return sendErrorResponse(res, STATUS.BAD_REQUEST, "Plan ID is required", null);
            }

            const deletedPlan = await this.planService.deletePlan(id);

            if(!deletedPlan.success) {
                return sendErrorResponse(res, deletedPlan.statusCode, deletedPlan.message, deletedPlan.errors);
            }

            sendResponse(res, STATUS.OK, deletedPlan.message, deletedPlan.data);
        } catch (error) {
            next(error);
        }
    };
};