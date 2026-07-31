"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...requiredRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({
                    success: false,
                    message: 'You are not authorized!',
                    errorDetails: 'Token missing in authorization header',
                });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
            const { role } = decoded;
            if (requiredRoles.length && !requiredRoles.includes(role)) {
                res.status(403).json({
                    success: false,
                    message: 'Forbidden Access',
                    errorDetails: 'You do not have permission to access this resource',
                });
                return;
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized access',
                errorDetails: error.message,
            });
        }
    };
};
exports.default = auth;
