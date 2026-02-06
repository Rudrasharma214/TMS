import Payment from "../models/payment.model.js";

export class PaymentRepository {

    /* Create Payment */
    async createPayment(paymentData, transaction = null) {
        return await Payment.create(paymentData, { transaction });
    }

    /* Find One Payment */
    async findOne({
        where = {},
        attributes = null,
        include = [],
        transaction = null,
        paranoid = true
    }) {
        return await Payment.findOne({
            where,
            attributes,
            include,
            transaction,
            paranoid
        });
    }
}
