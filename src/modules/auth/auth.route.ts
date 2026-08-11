import { Router } from "express";
import { AuthController } from "./auth.controller";

import auth from "../../middlewares/auth";

const router = Router();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get("/me", auth("ADMIN", "CUSTOMER", "TECHNICIAN"), AuthController.getMe);

router.post("/refresh-token", AuthController.refreshTokenController)


export default router;