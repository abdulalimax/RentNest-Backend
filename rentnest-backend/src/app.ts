import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { id: 'usr_' + Math.random().toString(36).substr(2, 9), name, email, role }
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockTokenHere'
  });
});

app.post('/api/properties', (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: 'Property created successfully',
    data: { id: 'prop_' + Math.random().toString(36).substr(2, 9), ...req.body }
  });
});

app.post('/api/payments/create', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Payment intent created successfully',
    clientSecret: 'pi_' + Math.random().toString(36).substr(2, 24) + '_secret_' + Math.random().toString(36).substr(2, 9)
  });
});

app.use('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server is running smoothly' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errorDetails: err,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API Endpoint Not Found',
    errorDetails: null,
  });
});

export default app;