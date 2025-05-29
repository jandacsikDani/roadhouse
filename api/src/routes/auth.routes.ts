import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { requireApiKey } from "../middleware/auth.middleware";

const router = Router();
const controller = new AuthController();

router.post('/login', asyncHandler(controller.login.bind(controller)));
router.post('/register', asyncHandler(controller.register.bind(controller)));

router.all('/login', (req, res) => {
    res.status(405).json({ message: "Method not allowed"});
});

export default router;