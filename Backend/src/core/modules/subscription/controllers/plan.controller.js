import { STATUS } from "../../../constants/statusCodes.js";
import { sendErrorResponse, sendResponse } from "../../../utils/response.js";


export class PlanController {
    constructor(planService) {
        this.planService = planService;
        this.getAllPlans = this.getAllPlans.bind(this);
    }

    /* Get All Plans */
    async getAllPlans(req, res, next) {
        try {
            const { search } = req.query;

            const plans = await this.planService.getAllPlans(search);

            if(!plans.success) {
                return sendErrorResponse(res, plans.statusCode, plans.message, plans.errors);
            }

            sendResponse(res, STATUS.OK, "Plans retrieved successfully", plans.data);
        } catch (error) {
            next(error);
        }
    };
};