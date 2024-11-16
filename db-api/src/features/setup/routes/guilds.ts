import express from "express";
import { addGuild } from "../controllers/guildController";

const router = express.Router();

// Add a guild
router.post("/", addGuild);

export default router;
