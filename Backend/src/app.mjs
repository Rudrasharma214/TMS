import express from 'express';
import { errorHandler } from './core/middlewares/error.middleware.js';
import authRouter from './core/modules/auth/routes/auth.route.js';
import { sendResponse } from './core/utils/response.js';
import { STATUS } from './core/constants/statusCodes.js';
import './core/events/eventListeners/index.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  sendResponse(res, STATUS.OK, 'Server is healthy', {
    version: 'TMS-1.0',
    ip: req.ip,
    healthy: true,
    requestedAt: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false
    }),
  });
});

app.use('/api/auth', authRouter);

app.use(errorHandler);
export default app;