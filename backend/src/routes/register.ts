
import express from "express";
import { register } from "../controllers/register";
const router = express.Router();

router.put("/", register);

export { router as registerRoute };
