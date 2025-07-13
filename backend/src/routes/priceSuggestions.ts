
import express from "express";
import { createPriceSuggestions, deletePriceSuggestions, getPriceSuggestions, getPriceSuggestionsById, modifyPriceSuggestions } from "../controllers/priceSuggestions";
const router = express.Router();

router.post("/", createPriceSuggestions);
router.get("/", getPriceSuggestions);
router.get("/:id", getPriceSuggestionsById);
router.patch("/:id", modifyPriceSuggestions);
router.delete("/:id", deletePriceSuggestions);

export { router as priceSuggestionsRoute };
