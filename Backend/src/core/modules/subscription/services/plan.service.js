import { STATUS } from "../../../constants/statusCodes.js";
import Plan from "../models/plan.model.js";


export class PlanService {
    /* Get All Plans */
    async getAllPlans(search) {
        try {
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
                message: "Plans retrieved successfully",
                data: plans
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while retrieving plans",
                errors: error.message
            }
        }
    }

    /* Create Plan */
    async createPlan(planData) {
        try {
            const newPlan = await Plan.create(planData);

            return {
                success: true,
                message: "Plan created successfully",
                data: newPlan
            };

        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while creating the plan",
                errors: error.message
            }
        }
    };

    /* Update Plan */
    async updatePlan(id, planData) {
        try {
            const plan = await Plan.findByPk(id);

            if (!plan) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: "Plan not found",
                    errors: null
                };
            }

            await plan.update(planData);

            return {
                success: true,
                message: "Plan updated successfully",
                data: plan
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while updating the plan",
                errors: error.message
            }
        }
    };

    /* Delete Plan */
    async deletePlan(id) {
        try {
            const plan = await Plan.findByPk(id);

            if (!plan) {
                return {
                    success: false,
                    statusCode: STATUS.NOT_FOUND,
                    message: "Plan not found",
                    errors: null
                };
            }

            await plan.destroy();

            return {
                success: true,
                message: "Plan deleted successfully",
                data: plan
            };
        } catch (error) {
            return {
                success: false,
                statusCode: STATUS.INTERNAL_ERROR,
                message: "An error occurred while deleting the plan",
                errors: error.message
            }
        }
    };
}