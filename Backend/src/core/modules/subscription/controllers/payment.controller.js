import { STATUS } from "../../../constants/statusCodes.js";
import { sendErrorResponse, sendResponse } from "../../../utils/response.js";

export class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.createPaymentOrder = this.createPaymentOrder.bind(this);
    }
};