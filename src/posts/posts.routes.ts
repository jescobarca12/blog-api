import { Router, Request, Response, NextFunction } from 'express';
import * as postsController from './posts.controller';
import { authenticate } from '../middleware/authenticate';   // ← nuevo

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

router.get('/',       asyncHandler(postsController.obtenerTodos));
router.get('/:id',    asyncHandler(postsController.obtenerPorId));

// ⬇️ Estas rutas requieren auth
router.post('/',      authenticate, asyncHandler(postsController.crear));
router.put('/:id',    authenticate, asyncHandler(postsController.actualizar));
router.delete('/:id', authenticate, asyncHandler(postsController.eliminar));

export default router;