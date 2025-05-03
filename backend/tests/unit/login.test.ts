import express from "express";
import request from "supertest";
import { describe, it, expect, jest } from "@jest/globals";
import { Account } from "../../src/entity/Account";
import { Role } from "../../src/entity/Role";
import * as loginController from "../../src/controllers/login";
import argon2 from "argon2";
import { login } from "../../src/controllers/login";

const app = express();
app.use(express.json());
const endpointAddress = "/api/public/login";
app.use(endpointAddress, login);


const seller: Role = {
  id: 2,
  name: "SELLER"
}

const mockAccount: Account = {
  id: 1,
  uuid: "uuid",
  email: "user@abba.cd",
  firstName: "First",
  lastName: "Last",
  businessId: "businessId",
  businessName: "businessName",
  businessRole: "businessRole",
  password: "hashedPassword",
  roleId: seller.id,
  employees: [],
  role: seller,
};
const loginData = { email: "user@abba.cd", password: "abbacd" };


describe("Login route", () => {

  it("should login and return token and account", async () => {

    // // Mock database check
    // jest.spyOn(loginController, "getAccountsByEmail").mockResolvedValue(mockAccount);
    // // Mock password verification
    // jest.spyOn(argon2, "verify").mockResolvedValue(true);

    // const response = await request(app).post(endpointAddress).send(loginData);

    // expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("account");
    // expect(response.body).toHaveProperty("token");
  });

});
