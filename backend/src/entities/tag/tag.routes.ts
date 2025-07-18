
import express from "express";
import { createTags, deleteTags, getTags, modifyTags, getTagsById } from "./tag.controller";
const router = express.Router();

router.post("/", createTags);
router.get("/", getTags);
router.get("/:id", getTagsById);
router.patch("/:id", modifyTags);
router.delete("/:id", deleteTags);

export { router as tagsRoute };
