import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import config from '../config';

const stripe = new Stripe(config.stripe_secret as string, {
  apiVersion: '2025-01-27' as any,
});

export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid payment amount',
        errorDetails: null,
      });
      return;
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.status(200).json({
      success: true,
      message: 'Payment intent created successfully',
      data: { clientSecret: paymentIntent.client_secret },
    });
  } catch (error) {
    next(error);
  }
};

export const confirmPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { paymentIntentId } = req.body;
    if (!paymentIntentId) {
      res.status(400).json({
        success: false,
        message: 'Payment intent ID is required',
        errorDetails: null,
      });
      return;
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status === 'succeeded') {
      res.status(200).json({
        success: true,
        message: 'Payment verified and confirmed successfully',
        data: {
          transactionId: paymentIntent.id,
          status: 'PAID',
          amount: paymentIntent.amount / 100,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment validation failed or pending',
        errorDetails: { status: paymentIntent.status },
      });
    }
  } catch (error) {
    next(error);
  }
};