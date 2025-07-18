import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";
import { getRepositories } from "../../repositories";
import { createAccessToken, createRefreshToken } from "../../utils/auth";

export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;
    const { account } = await getRepositories();

    const accountFound = await account.createQueryBuilder("account")
      .leftJoinAndSelect("account.role", "role")
      .where("account.email = :email", {email: email})
      .getOne();

    if (accountFound === null) {
      res.status(401).json({
        status: false,
        msg: "invalidcredentials"
      });
      return;
    }

    const isPasswordValid = await argon2.verify(accountFound.password, password);

    if (!isPasswordValid) {
      res.status(401).json({
        status: false,
        msg: "invalidcredentials"
      });
      return;
    }

    const accountData = {
      email: accountFound.email,
      firstName: accountFound.firstName,
      lastName: accountFound.lastName,
      role: accountFound.role,
      uuid: accountFound.uuid
    };

    const refreshToken = await createRefreshToken(accountFound.uuid);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true
    });

    const accessToken = await createAccessToken(req, refreshToken);

    if (!("token" in accessToken)) {
      res
        .status(500)
        .json(accessToken)
        .send();
      return;
    }

    res
      .status(200)
      .json({ token: accessToken.token, account: accountData })
      .send();
    return;
};


