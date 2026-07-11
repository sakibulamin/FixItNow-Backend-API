import { Router } from "express";

import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";

const router = Router();


router.get("/dashboard", auth("ADMIN"), AdminController.getDashboardStats);

router.get("/users", auth("ADMIN"), AdminController.getAllUsers);

router.patch("/users/:id", auth("ADMIN"), AdminController.changeUserStatus);

router.get("/bookings", auth("ADMIN"), AdminController.getAllBookings);






export default router;