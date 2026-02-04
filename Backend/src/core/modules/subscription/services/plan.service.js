import { STATUS } from "../../../constants/statusCodes.js";
import Plan from "../models/plan.model.js";


export class PlanService {
    /* Get All Plans */
    async getAllPlans(search) {
        let whereClause = {
            is_active: true
        };

        if (search) {
            whereClause = {
                name: { $like: `%${search}%` }
            };
        }
        
        const plans = await Plan.findAll({ where: whereClause });

        if (!plans) {
            return {
                success: false,
                statusCode: STATUS.NOT_FOUND,
                message: "No plans found",
                errors: null
            };
        }

        return {
            success: true,
            data: plans
        };
    }
}