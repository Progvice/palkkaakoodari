
import express from "express";
import { login } from "./login.controller";
const router = express.Router();

router.post("/", login);

export { router as loginRoute };
