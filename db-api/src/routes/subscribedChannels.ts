import { Router } from "express";
import { channelIsSubscribed } from "../controllers/subscribedChannelsController";

const router = Router();

// Check if polaroids has already subscribed to a channel
router.get("/is-subscribed/:channelId", channelIsSubscribed);

// Add a subscribed channel
router.post("/");

export default router;
