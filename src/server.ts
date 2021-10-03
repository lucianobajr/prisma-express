import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import routes from "./routes";
import AppError from "./errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log("Back-end started on port 3333! 🔥️");
});
