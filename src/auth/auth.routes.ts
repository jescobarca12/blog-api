import { Router, Request, Response, NextFunction } from 'express';
import * as authController from './auth.controller';

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

router.post('/register', asyncHandler(authController.register));
router.post('/login',    asyncHandler(authController.login));   // ← nuevo

export default router;