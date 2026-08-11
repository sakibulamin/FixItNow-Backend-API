import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import globalErrorHandler from "./errors/globalErrorHandlear";
import {notFound} from "./middlewares/notFound";

const app:Application = express();

app.use(
  cors({
    origin: [
      "https://fix-it-now-frontend-bay.vercel.app/",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")

})

app.use("/api", router);



app.use(notFound);


app.use(globalErrorHandler);


export default app;