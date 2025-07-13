import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors/AppError";

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({ error: "Internal Server Error" });
}
