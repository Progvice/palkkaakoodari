import { Request, Response, NextFunction } from "express";
import { runAuth } from "../utils/auth";

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {

  const auth = await runAuth(req);

  if (!auth.status) {
    res.status(403).json({
      status: false,
      msg: "sessionexpired"
    });
    return;
  }

  res.locals.auth = auth;

  next();
};
