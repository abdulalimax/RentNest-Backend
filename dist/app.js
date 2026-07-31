"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const payment_controller_1 = require("./modules/payment/payment.controller");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to RentNest Backend API',
    });
});
app.post('/api/payments/create', payment_controller_1.createPaymentIntent);
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API Endpoint Not Found',
        errorDetails: `The requested URL ${req.originalUrl} was not found on this server.`,
    });
});
exports.default = app;
