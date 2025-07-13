import { Request, Response, NextFunction } from "express";
import { runAuth } from "../utils/auth";
import { getAccountId } from "../utils/jwt";
import { AppError } from "../utils/errors/AppError";

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {

  const auth = await runAuth(req);

  if (!auth.status) {
    throw new AppError('sessionexpired', 401);
  }


  res.locals.accountId = getAccountId(auth?.token, process.env.JWT_ACCESS_SECRET) as number;
  res.locals.auth = auth;

  next();
};
