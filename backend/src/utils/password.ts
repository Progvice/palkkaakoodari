import * as argon2 from "argon2";

export const hashPassword = async (password: string) => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    throw new Error("Error hashing password");
  };
};

export const verifyPassword = async (password: string, hash: string) => {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    throw new Error("Error verifying password");
  }
};