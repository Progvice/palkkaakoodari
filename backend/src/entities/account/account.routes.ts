
import express from "express";
import { createAccounts, deleteAccounts, getAccounts, getAccountsById, modifyAccounts } from "./account.controller";
const router = express.Router();

router.post("/", createAccounts);
router.get("/", getAccounts);
router.get("/:uuid", getAccountsById);
router.patch("/:uuid", modifyAccounts);
router.delete("/:uuid", deleteAccounts);

export { router as accountsRoute };
