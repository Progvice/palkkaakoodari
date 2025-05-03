
import express from "express";
import { createEmployees, deleteEmployees, getEmployees, modifyEmployees, getEmployeesById } from "../controllers/employees";
const router = express.Router();

router.post("/", createEmployees);
router.get("/", getEmployees);
router.get("/:uuid", getEmployeesById);
router.put("/:uuid", modifyEmployees);
router.delete("/:uuid", deleteEmployees);

export { router as employeesRoute };
