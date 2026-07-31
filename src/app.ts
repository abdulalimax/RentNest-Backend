import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import validateRequest from './middlewares/validateRequest';
import { PropertyValidations } from './modules/properties/properties.validation';
import { createPaymentIntent } from './modules/payment/payment.controller';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to RentNest Backend API',
  });
});

app.post(
  '/api/payments/create',
  createPaymentIntent
);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API Endpoint Not Found',
    errorDetails: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
});

export default app;
