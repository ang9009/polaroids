import { Router } from "express";
import { addSubscribedChannel, channelIsSubscribed, createAlbumAndLinkChannel, getAllSubbedChannels, updateChannelAlbum, } from "../controllers/subbedChannels.controller";
const router = Router();
// Get all subscribed channels
router.get("/:guildId", getAllSubbedChannels);
// Check if polaroids has already subscribed to a channel
router.get("/is-subscribed/:channelId", channelIsSubscribed);
// Add a subscribed channel (with the option of also creating a new album for it)
router.post("/", addSubscribedChannel);
// Link a channel that polaroids is already subscribed to another existing album
router.patch("/link-existing-album", updateChannelAlbum);
// Create a new album, then link an existing channel to it
router.patch("/link-new-album", createAlbumAndLinkChannel);
export default router;
