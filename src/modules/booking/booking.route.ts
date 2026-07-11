import { Router } from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";

const router = Router();


router.post("/", auth("CUSTOMER"), BookingController.createBooking);

router.get("/", auth("ADMIN", "CUSTOMER", "TECHNICIAN"), BookingController.getAllBookings);

router.get("/:id", auth("ADMIN", "CUSTOMER", "TECHNICIAN"), BookingController.getSingleBooking);

router.put("/:id", auth("ADMIN", "TECHNICIAN"), BookingController.updateBooking);

router.delete("/:id", auth("ADMIN", "CUSTOMER"), BookingController.deleteBooking);




export default router;