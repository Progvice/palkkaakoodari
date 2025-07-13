
import { Request, Response, NextFunction } from "express";
import { Account } from "../entity/Account";
import { generateToken } from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";
import { getRepositories } from "../repositories";
import { requiredFields } from "../utils/fields";

export const register = async (req: Request, res: Response, next: NextFunction) => {

  const fields = ["email", "passwordRaw", "firstName", "lastName", "businessId", "businessName"];

  const registrationFormData: Partial<Account> = req.body;

  if (!(await requiredFields(req, fields)).status) {
    res
      .status(400)
      .json("Missing required fields" + fields.join(", "))
      .send();
    return;
  }

  const { account } = await getRepositories();

  const hashedPassword = await argon2.hash(req.body.passwordRaw);

  const finalAccount = {
    uuid: uuidv4(),
    email: registrationFormData.email,
    password: hashedPassword,
    firstName: registrationFormData.firstName,
    lastName: registrationFormData.lastName,
    businessId: registrationFormData.businessId,
    businessName: registrationFormData.businessName,
    businessRole: registrationFormData.businessRole,
    roleId: 1
  };


};
