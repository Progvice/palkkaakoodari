
import express from "express";
import { logout } from "../controllers/logout";
const router = express.Router();

router.get("/", logout);

export { router as logoutRoute };
