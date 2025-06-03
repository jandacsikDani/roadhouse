import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const controller = new MenuController();

router.get('/foodTypes', verifyToken, controller.getFoodTypes.bind(controller));
router.get('/foodTypes/:id', verifyToken, controller.getFoodsByTypeId.bind(controller));
router.get('/', verifyToken, controller.getAll.bind(controller));
router.get('/:id', verifyToken, controller.getById.bind(controller));
router.post('/', verifyToken, controller.create.bind(controller));

router.all('/', verifyToken, (req, res) => {
    res.status(405).json({ message: "Method not allowed"});
});

export default router;