import morgan from "morgan";
import type { Request } from "express";

type RequestWithId = Request & { requestId?: string };

morgan.token("request-id", (req) => (req as RequestWithId).requestId ?? "unknown");

export const requestLoggerMiddleware = morgan(
  ":request-id :method :url :status :response-time ms"
);
