import { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";

type RequestWithId = Request & { requestId?: string };

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = randomUUID();
  (req as RequestWithId).requestId = requestId;
  res.setHeader("X-Request-ID", requestId);
  next();
};
