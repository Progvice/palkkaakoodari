
import express from "express";
import { logout } from "./logout.controller";
const router = express.Router();

router.get("/", logout);

export { router as logoutRoute };
