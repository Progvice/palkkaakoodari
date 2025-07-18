
import express from "express";
import { createRoles, deleteRoles, getRoles, modifyRoles, getRolesById } from "./role.controller";
const router = express.Router();

router.post("/", createRoles);
router.get("/", getRoles);
router.get("/:id", getRolesById);
router.patch("/:id", modifyRoles);
router.delete("/:id", deleteRoles);

export { router as rolesRoute };
