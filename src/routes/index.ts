import { Router } from "express";

import authRoutes from "../modules/auth/auth.route";
import userRoutes from "../modules/user/user.route";
import technicianRoutes from "../modules/technician/technician.route";
import categoryRoutes from "../modules/category/category.route";
import serviceRoutes from "../modules/service/service.route";
import bookingRoutes from "../modules/booking/booking.route";
import paymentRoutes from "../modules/payment/payment.route";
import reviewRoutes from "../modules/review/review.route";
import adminRoutes from "../modules/admin/admin.route";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/technicians", technicianRoutes);

router.use("/categories", categoryRoutes);

router.use("/services", serviceRoutes);

router.use("/bookings", bookingRoutes);

router.use("/payments", paymentRoutes);

router.use("/reviews", reviewRoutes);

router.use("/admin", adminRoutes);



export default router;