import { Router } from "express";
import {
  addSubscribedChannel,
  channelIsSubscribed,
  updateChannelAlbum,
} from "../controllers/subbedChannelsController";

const router = Router();

// Check if polaroids has already subscribed to a channel
router.get("/is-subscribed/:channelId", channelIsSubscribed);

// Add a subscribed channel
router.post("/", addSubscribedChannel);

// Change the linked album that a channel that is already subscribed to
router.patch("/", updateChannelAlbum);

export default router;
