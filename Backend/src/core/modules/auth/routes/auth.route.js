import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', AuthController.signup);

export default authRouter;