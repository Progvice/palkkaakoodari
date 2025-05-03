import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  if (req.cookies?.refreshToken) {
    res.cookie("refreshToken", "", {expires: new Date(1), httpOnly: true, path: "/"});
  };

  res
    .status(200)
    .json({
      status: true,
      msg: "logoutsuccess"
    });
};
