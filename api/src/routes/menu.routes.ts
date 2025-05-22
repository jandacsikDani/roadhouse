import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";
import { requireApiKey } from "../middleware/auth.middleware";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const controller = new MenuController();

router.get('/', verifyToken, controller.getAll.bind(controller));
router.get('/:id', verifyToken, requireApiKey, controller.getById.bind(controller));
router.post('/', verifyToken, requireApiKey, controller.create.bind(controller));

export default router;