import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import config from '../../config';

const stripe = new Stripe(config.stripe_secret_key!, {
  apiVersion: '2025-01-27' as any,
});

export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).json({
      success: true,
      message: 'Payment intent created successfully',
      data: {
        clientSecret: paymentIntent.client_secret,
        transactionId: paymentIntent.id,
      },
    });
  } catch (error) {
    next(error);
  }
};
