import type { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      next(error);
    }
  };
};

export default validateRequest;
