import Razorpay from "razorpay";
import env from "../../../../config/env.js";
import AppError from "../../../utils/AppError.js";
import { STATUS } from "../../../constants/statusCodes.js";
import crypto from "crypto";


/**
 * Initialize Razorpay with credentials
*/

let razorpayInstance = null;

export const initializeRazorpay = () => {
  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new AppError('Razorpay credentials not configured', STATUS.INTERNAL_ERROR);
  }

  razorpayInstance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  return razorpayInstance;
};

/**
 * Create a payment order
 */
export const createRazorpayOrder = async (amount, currency, receipt) => {
    try {
        const razorpay = initializeRazorpay();

        const amountInPaise = Math.round(amount * 100);

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency,
            receipt,
        });

        return {
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            status: order.status,
            created_at: order.created_at,
        }
    } catch (error) {
        throw new AppError('Failed to create Razorpay order', STATUS.INTERNAL_ERROR);
    }
};

/**
 * Verify Razorpay webhook signature
 */
export const verifyRazorpaySignature = (requestBody, signature) => {
    try {
        const keySecret = env.RAZORPAY_KEY_SECRET;

        if (!keySecret) {
            throw new AppError('Razorpay secret key not configured', STATUS.INTERNAL_ERROR);
        }

        // Create HMAC SHA256 hash
        const hash = crypto
            .createHmac('sha256', keySecret)
            .update(requestBody)
            .digest('hex');

        // Compare signature with hash
        return hash === signature;
    } catch (error) {
        throw new AppError('Signature verification failed', STATUS.INTERNAL_ERROR);
    }
};