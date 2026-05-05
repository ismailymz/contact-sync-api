import { Request, Response, NextFunction } from "express";
import { AppError } from "../types";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[Error] ${err.message}`);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Beklenmedik hata
  res.status(500).json({
    success: false,
    error: "Sunucu hatası",
  });
}