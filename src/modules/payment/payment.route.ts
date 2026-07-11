import { Router } from "express";

import { PaymentController } from "./payment.controller";
import auth from "../../middlewares/auth";

const router = Router();


router.get("/", auth("ADMIN"), PaymentController.getAllPayments);

router.get("/:id", auth("ADMIN", "CUSTOMER"), PaymentController.getSinglePayment);

router.post("/init/:bookingId",  PaymentController.initPayment);





export default router;