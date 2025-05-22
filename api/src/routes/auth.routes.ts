import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { requireApiKey } from "../middleware/auth.middleware";

const router = Router();
const controller = new AuthController();

router.post('/login', requireApiKey, asyncHandler(controller.login.bind(controller)));
router.post('/register', requireApiKey, asyncHandler(controller.register.bind(controller)));

export default router;