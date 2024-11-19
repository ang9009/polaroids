import { Router } from "express";
import { channelIsSubscribed } from "../controllers/subscribedChannelsController";

const router = Router();

// Check if polaroids has already subscribed to a channel
router.get("/is-subscribed/:channelId", channelIsSubscribed);

export default router;
