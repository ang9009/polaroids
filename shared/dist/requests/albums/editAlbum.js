import { z } from "zod";
import { AlbumDescSchema, AlbumNameSchema } from "./createAlbum";
export const EditAlbumRequestSchema = z.object({
    albumId: z.string(),
    newAlbumName: AlbumNameSchema,
    newAlbumDesc: AlbumDescSchema,
});
//# sourceMappingURL=editAlbum.js.map