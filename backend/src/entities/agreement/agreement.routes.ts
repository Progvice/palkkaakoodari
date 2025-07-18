
import express from "express";
import { createAgreements, deleteAgreements, getAgreements, modifyAgreements, getAgreementsById } from "./agreement.controller";
const router = express.Router();

router.post("/", createAgreements);
router.get("/", getAgreements);
router.get("/:id", getAgreementsById);
router.patch("/:id", modifyAgreements);
router.delete("/:id", deleteAgreements);

export { router as agreementsRoute };
