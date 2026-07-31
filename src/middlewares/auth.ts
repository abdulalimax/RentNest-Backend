import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

      const decoded = jwt.verify(token, config.jwt_secret!) as JwtPayload;
      const { role } = decoded;

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        res.status(403).json({
          success: false,
          message: 'Forbidden Access',
          errorDetails: 'You do not have permission to access this resource',
        });
        return;
      }

      (req as any).user = decoded;
      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access',
        errorDetails: error.message,
      });
    }
  };
};

export default auth;
