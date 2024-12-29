import { z } from "zod";
import { CreateAlbumRequestSchema } from "../albums/createAlbum";
export const CreateAndLinkAlbumRequestSchema = CreateAlbumRequestSchema.extend({
    guildId: z.string(),
    channelId: z.string(),
});
//# sourceMappingURL=createAlbumAndLinkChannel.js.map