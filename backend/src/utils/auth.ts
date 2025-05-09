// LIBRARIES
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";
import { AuthenticatedRequest, AuthObject } from "../types";
import { getRepositories } from "../repositories";
import type { JwtPayload } from "jsonwebtoken";

type AccessTokenErrorType = {
  status: boolean;
  name: string;
  token: string;
  msg?: string;
};

type AccessTokenRes = {
  status: boolean;
  token: string;
} | {
  status: boolean;
  err: AccessTokenErrorType
};

interface CustomJwtPayload extends JwtPayload {
  iss?: string;
  sub?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

// JWT SECRETS - Secret keys for generating access token and refresh token
/**
 *
 * @name CreateAccessToken
 * @description Creates new access token from refresh token. This function checks first that refresh token is valid before creating access token.
 * @param refreshToken
 * @returns {Promise<AccessTokenRes>}
 */

export const createAccessToken = async (req: Request, refreshToken: string): Promise<AccessTokenRes> => {

  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  const { account } = await getRepositories();

  if (req.headers["authorization"]) {

    const aTokenFromHeader = req.headers["authorization"].split(" ")[1];

    try {
      const verification: CustomJwtPayload | string = jwt.verify(aTokenFromHeader, accessSecret);

      if (typeof verification === "string") {
        throw new Error();
      }

      return {
        status: true,
        token: aTokenFromHeader
      };
    }
    catch (err) {
      const tokenErr = AccessTokenError(err);
      if (tokenErr.name !== "tokenexpired") {
        return {
          status: false,
          err: tokenErr
        };
      }
    }
  }

  try {
    const verification: CustomJwtPayload | string = jwt.verify(refreshToken, refreshSecret);

    if (typeof verification === "string") {
      throw new Error();
    }

    const userData = await account.findOne({
      where: { uuid: verification.sub },
      relations: ["role"]
    });

    const finalUserData = {
      accountId: userData.id,
      role: userData.role
    };

    const token = jwt.sign(finalUserData, accessSecret, {
      expiresIn: "15m"
    });

    return {
      status: true,
      token: token
    };
  }
  catch (err: any) {
    return {
      status: false,
      err: AccessTokenError(err),
    };
  }
};
/**
 * @name CheckAccessToken
 * @param access_token
 * @description Simple function to check if access token is valid and not blacklisted. Returns true if token is valid.
 * @returns
 */
const checkAccessToken = async (access_token: string): Promise<boolean> => {

  const accessSecret = process.env.JWT_ACCESS_SECRET;

  if (access_token.length < 1) {
    return false;
  }
  try {
    jwt.verify(access_token, accessSecret);
  }
  catch (err: any) {
    return false;
  }

  return true;
};
/**
 * @name AccessTokenError
 * @param err
 * @description This function just handles error. I added this function to make CreateAccessToken function easier to read.
 * @returns {object}
 */
const AccessTokenError = (err: any): AccessTokenErrorType => {
  let errObj: AccessTokenErrorType;
  switch (err.name) {
    case "TokenExpiredError":
      errObj = {
        status: false,
        name: "tokenexpired",
        token: "refresh"
      };
      break;
    case "JsonWebTokenError":
      errObj = {
        status: false,
        name: "tokenerror",
        msg: err.message,
        token: "refresh"
      };
      break;
    case "NotBeforeError":
      errObj = {
        status: false,
        name: "tokennotactivated",
        token: "refresh"
      };
      break;
    default:
      errObj = {
        status: false,
        name: "jwtunknownerror",
        token: "refresh"
      };
      break;
  }
  return errObj;
};
/**
 * @name CreateRefreshToken
 * @description This is used to create new refresh token. This is basically token that maintains session
 * @param uuid Input users uuid here. This way you can create refresh token. This token can be used to create access token.
 * @returns {string}
 */
export const createRefreshToken = async (uuid: string): Promise<string> => {

  const userJwt = jwt.sign({
    iss: process.env.HOST ?? "localhost:3000",
    sub: uuid,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    nbf: Math.floor(Date.now() / 1000),
    iat: Math.floor(Date.now() / 1000),
    jti: uuidv4()
  },
    process.env.JWT_REFRESH_SECRET
  );
  return userJwt;
};

/**
 * @name Run
 * @description This function sets new access token to cookie automatically. Developer can include this function to
 * every request that requires authentication. This way developer does not have to write same code again and again
 * to every request that requires authentication. This function returns token back to developer. This is made so that
 * new access token can be created on the fly if it is expired. UX is better this way.
 *
 * @param req Express Req object. It will be used to get tokens from cookies.
 * @param res Express Res object. Will be used to set new cookies if needed.
 * @returns {Promise<AuthObject>} object always has "status" and "msg" properties in it.
 *
 * @example
 * // Example 1: Access token is expired/invalid but refresh token is valid
 * import Auth from '../utils/authentication';
 * import { AuthObject } from '../interfaces/Auth';
 * const checkAuth : AuthObject = await Auth.Run(req, res);
 * console.log(checkAuth); // Output: {status: true, msg: 'tokenrenewed', token: [NEWTOKEN] };
 *
 * // Example 2: Refresh token is expired/invalid
 * import Auth from '../utils/authentication';
 * import { AuthObject } from '../interfaces/Auth';
 * const checkAuth : AuthObject = await Auth.Run(req, res);
 * console.log(checkAuth); // Output: {status: false, msg: 'sessionexpired'};
 */

export const runAuth = async (req: Request): Promise<AuthObject> => {
  // Check that HTTP request has refresh token included

  const refreshToken: string | undefined = req.cookies.refreshToken;
  if (refreshToken === undefined) {
    return {
      status: false,
      msg: "refreshtokennotsent"
    };
  }

  let accessToken: AccessTokenRes = await createAccessToken(req, refreshToken);

  if ("token" in accessToken) {
    return {
      status: true,
      msg: "authsuccess",
      token: accessToken.token
    };
  }


  if ("err" in accessToken) {
    return {
      status: false,
      msg: "sessionexpired"
    };
  }

  return {
    status: false,
    msg: "unknownerror"
  };
};


export default {
  createAccessToken,
  createRefreshToken,
  checkAccessToken,
  runAuth,
};
