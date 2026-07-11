import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import globalErrorHandler from "./errors/globalErrorHandlear";
import { notFound } from "./middlewares/notFound";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api", router);
app.use("/api", router);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
