import { sendErrorResponse } from '../utils/response.js';
import { STATUS } from '../constants/statusCodes';


export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((err) => err.message);
      return sendErrorResponse(res, STATUS.BAD_REQUEST, 'Validation Error', messages);
    }

    req.body = value;
    next();
  };
};