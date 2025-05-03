import { Request, Response } from "express";
import { AuthObject } from "../types";

export const getAccessToken = async (req: Request, res: Response) => {
  const auth = res.locals.auth as AuthObject;
  res
    .status(200)
    .json(auth);
};