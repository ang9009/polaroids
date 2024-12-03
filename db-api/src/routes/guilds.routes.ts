import express from "express";
import { addGuild, deleteGuild } from "../controllers/guilds.controller";

const router = express.Router();

// Add a guild
router.post("/", addGuild);

// Delete a guild
router.delete("/:guildId", deleteGuild);

export default router;
