import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const controller = new MenuController();

/*FoodTypes*/
router.get('/foodTypes', controller.getFoodTypes.bind(controller));
router.get('/foodTypes/:id', verifyToken, controller.getFoodsByTypeId.bind(controller));

/*Menu items*/
router.get('/', controller.getAll.bind(controller));
router.get('/:id', verifyToken, controller.getById.bind(controller));
router.post('/', verifyToken, controller.create.bind(controller));
router.delete('/:id', verifyToken, controller.deleteFood.bind(controller));
router.put('/:id', verifyToken, controller.updateFood.bind(controller));


router.all('/', verifyToken, (req, res) => {
    res.status(405).json({ message: "Method not allowed"});
});

export default router;