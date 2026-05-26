import { Router, Request, Response, NextFunction } from 'express';
import * as autoresController from './autores.controller';

// asyncHandler — el wrapper que ya conoces
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

router.get('/',       asyncHandler(autoresController.obtenerTodos));
router.get('/:id',    asyncHandler(autoresController.obtenerPorId));
router.post('/',      asyncHandler(autoresController.crear));
router.put('/:id',    asyncHandler(autoresController.actualizar));
router.delete('/:id', asyncHandler(autoresController.eliminar));

export default router;