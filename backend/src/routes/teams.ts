
import express from "express";
import { createTeams, deleteTeams, getTeams, modifyTeams, getTeamsById } from "../controllers/teams";
const router = express.Router();

router.post("/", createTeams);
router.get("/", getTeams);
router.get("/:id", getTeamsById);
router.patch("/:id", modifyTeams);
router.delete("/:id", deleteTeams);

export { router as teamsRoute };
