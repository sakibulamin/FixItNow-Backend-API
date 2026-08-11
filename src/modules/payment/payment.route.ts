import { Router } from "express";

import { PaymentController } from "./payment.controller";
import auth from "../../middlewares/auth";

const router = Router();


router.get("/",  PaymentController.getAllPayments);

router.get("/:id",  PaymentController.getSinglePayment);

router.post("/init/:bookingId",  PaymentController.initPayment);

router.post("/success", PaymentController.paymentSuccess);
router.post("/fail", PaymentController.paymentFail);
router.post("/cancel", PaymentController.paymentCancel);





export default router;