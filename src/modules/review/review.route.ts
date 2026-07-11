import { Router } from "express";


import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";

const router = Router();


router.post("/", auth("CUSTOMER"), ReviewController.createReview);

router.get("/", ReviewController.getAllReviews);

router.get("/:id", ReviewController.getSingleReview);

router.patch("/:id", auth("CUSTOMER"), ReviewController.updateReview);

router.delete("/:id", auth("ADMIN", "CUSTOMER"), ReviewController.deleteReview);

export default router;