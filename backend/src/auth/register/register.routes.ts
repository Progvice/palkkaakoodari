
import express from "express";
import { register } from "./register.controller";
const router = express.Router();

router.put("/", register);

export { router as registerRoute };
