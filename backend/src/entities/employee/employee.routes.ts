
import express from "express";
import { createEmployees, deleteEmployees, getEmployees, modifyEmployees, getEmployeesById } from "./employee.controller";
const router = express.Router();

router.post("/", createEmployees);
router.get("/", getEmployees);
router.get("/:uuid", getEmployeesById);
router.patch("/:uuid", modifyEmployees);
router.delete("/:uuid", deleteEmployees);

export { router as employeesRoute };
