import express from 'express';
import { errorHandler } from './core/middlewares/error.middleware.js';
import authRouter from './core/modules/auth/routes/auth.route.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRouter);

app.use(errorHandler);
export default app;