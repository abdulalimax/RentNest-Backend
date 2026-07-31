"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const stripe = new stripe_1.default(config_1.default.stripe_secret_key, {
    apiVersion: '2025-01-27',
});
const createPaymentIntent = async (req, res, next) => {
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
    }
    catch (error) {
        next(error);
    }
};
exports.createPaymentIntent = createPaymentIntent;
