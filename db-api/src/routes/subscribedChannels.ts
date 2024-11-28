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

// Link a channel that polaroids is already subscribed to another existing album
router.patch("/link-existing-album", updateChannelAlbum);

// Create a new album, then link an existing channel to it
router.patch("/link-new-album");

export default router;
