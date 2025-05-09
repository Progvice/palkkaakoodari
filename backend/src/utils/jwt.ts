import jwt, { Algorithm } from "jsonwebtoken";
import { StringValue } from "ms";

/**
 * Generates a JWT token.
 * @param secret - The secret key to sign the token.
 * @param payload - The payload to include in the token.
 * @param expireString - The expiration time of the token (default is '1h').
 * @param algorithm - The algorithm to use for signing the token (default is 'HS256').
 * @returns The generated JWT token.
 * @throws {Error} If the expiresIn option is invalid.
 */
export function generateToken(
  secret: string
  , payload: { [key: string]: string }
  , expireString: StringValue = "1h"
  , algorithm: Algorithm = "HS256"
): string {
  const jwtPayload: jwt.JwtPayload = payload;
  const options: jwt.SignOptions = { expiresIn: expireString, algorithm: algorithm };
  const jwtSecret: jwt.Secret = secret;
  const token: string = jwt.sign(jwtPayload, jwtSecret, options);
  return token;
}

/**
 * Verifies a JWT token.
 * @param token - The JWT token to verify.
 * @param secret - The secret key to verify the token.
 * @returns The decoded token payload.
 * @throws {TokenExpiredError} If the token has expired.
 * @throws {JsonWebTokenError} If the token is invalid.
 */
export function verifyToken(token: string, secret: string) {
  try {
    return jwt.verify(token, secret)
  } catch(err) {
    console.log(err);
    return false;
  }
}

export function getAccountId(token: string, secret: string) : boolean | number {
  try {
    const decryptedToken = jwt.verify(token, secret);

    if (typeof decryptedToken === "string") return false;
    if (isNaN(Number(decryptedToken?.accountId))) return false;

    return Number(decryptedToken?.accountId);
  } catch(err) {
    console.log(err);
    return false;
  }
}
