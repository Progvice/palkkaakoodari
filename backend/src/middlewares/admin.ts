import { Request, Response, NextFunction } from "express";

export const adminMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
  console.log("admin middleware");
  next();
};