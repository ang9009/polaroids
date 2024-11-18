import express from "express";
import { addGuild, deleteGuild } from "../controllers/guildController";

const router = express.Router();

// Add a guild
router.post("/", addGuild);

// Delete a guild
router.delete("/", deleteGuild);

export default router;
