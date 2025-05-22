import { Router } from "express";
import menuRoutes from './menu.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/menu', menuRoutes);
router.use('/auth', authRoutes);

export default router;