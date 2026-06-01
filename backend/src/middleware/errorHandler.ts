import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

type RequestWithId = Request & { requestId?: string };

export const notFoundMiddleware = (req: Request, res: Response) => {
  const requestId = (req as RequestWithId).requestId;
  res.status(404).json({
    error: "Route not found",
    requestId,
  });
};

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const requestId = (req as RequestWithId).requestId;
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : "Internal server error";

  console.error(
    `[requestId=${requestId ?? "unknown"}] ${req.method} ${req.originalUrl}:`,
    err
  );

  res.status(statusCode).json({
    error: message,
    requestId,
  });
};
