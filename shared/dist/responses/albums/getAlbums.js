import { AlbumSchema } from "backend/prisma/generated/zod";
import { z } from "zod";
const GetAlbumsResponseSchema = z.array(AlbumSchema);
export { GetAlbumsResponseSchema };
//# sourceMappingURL=getAlbums.js.map