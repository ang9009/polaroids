import { z } from "zod";
const IsSubscribedResponseSchema = z.discriminatedUnion("isSubscribed", [
    z.object({
        isSubscribed: z.literal(true),
        linkedAlbumId: z.string(),
        linkedAlbumName: z.string(),
    }),
    z.object({
        isSubscribed: z.literal(false),
    }),
]);
export { IsSubscribedResponseSchema };
//# sourceMappingURL=isSubscribed.js.map