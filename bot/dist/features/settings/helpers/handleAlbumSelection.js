import { AlbumSelectionType } from "../data/albumSelectionType";
import { createAlbumAndLinkChannel } from "../services/createAlbumAndLinkChannel";
import { setChannelAlbum } from "../services/setChannelAlbum";
import { subscribeChannelAndSetAlbum } from "../services/subscribeChannelAndSetAlbum";
import { subscribeChannelWithNewAlbum } from "../services/subscribeChannelWithNewAlbum.ts";
/**
 * A helper function that handles the user's album selection: if the user wants
 * to create a new album, then this should do so using the given name and
 * description. If the user wants to select an existing album, this should link
 * the current channel with the specified album. If the channel has already been
 * subscribed to, this should send a PATCH request instead of a POST request.
 * @param albumData data regarding the specified album
 * @param channelId the channel id the interaction is occurring in
 * @param guildId the guild id of the current guild
 * @param alreadySubscribed whether the channel has already been subscribed to
 */
export const handleAlbumSelection = async (albumData, channelId, guildId, alreadySubscribed) => {
    if (!guildId || !channelId) {
        throw Error("guildId or channelId is undefined");
    }
    if (albumData.type === AlbumSelectionType.CREATE_NEW) {
        const { albumName: newAlbumName, albumDesc: newAlbumDesc } = albumData;
        // If channel is already subscribed to, create album and link the existing
        // channel to it
        if (alreadySubscribed) {
            await createAlbumAndLinkChannel(newAlbumName, newAlbumDesc, channelId, guildId);
        }
        else {
            // Otherwise, create a new album and save the channel
            await subscribeChannelWithNewAlbum(newAlbumName, newAlbumDesc, channelId, guildId);
        }
    }
    else {
        // If user wants to use existing album
        const { albumId } = albumData;
        // If channel is already subscribed to, change its linked album
        if (alreadySubscribed) {
            await setChannelAlbum(albumId, channelId, guildId);
        }
        else {
            // Otherwise, save the channel and set its linked album
            await subscribeChannelAndSetAlbum(albumId, channelId, guildId);
        }
    }
};
//# sourceMappingURL=handleAlbumSelection.js.map