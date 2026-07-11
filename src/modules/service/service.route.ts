import { Router } from "express";
import { ServiceController } from "./service.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth("TECHNICIAN"), ServiceController.createService);

router.get("/", ServiceController.getAllServices);

router.get("/:id", ServiceController.getSingleService);

router.patch("/:id", auth("TECHNICIAN"), ServiceController.updateService);

router.delete("/:id", auth("TECHNICIAN", "ADMIN"), ServiceController.deleteService);

export default router;