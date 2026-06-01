import express, { Request, Response } from "express";
import cors from "cors";
import { apiRoutes } from "./routes/api";
import {
  errorHandlerMiddleware,
  notFoundMiddleware,
} from "./middleware/errorHandler";
import { requestIdMiddleware } from "./middleware/requestId";
import { requestLoggerMiddleware } from "./middleware/requestLogger";

const PORT = process.env.PORT || 8000;

export const createApp = () => {
  const app = express();

  app.use(requestIdMiddleware);
  app.use(requestLoggerMiddleware);
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
  });

  app.use("/api", apiRoutes);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
};

export const app = createApp();

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
