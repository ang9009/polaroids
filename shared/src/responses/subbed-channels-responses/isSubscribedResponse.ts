import { z } from "zod";

const IsSubscribedResponseSchema = z.discriminatedUnion("isSubscribed", [
  z.object({
    isSubscribed: z.literal(true),
    linkedAlbum: z.string(),
  }),
  z.object({
    isSubscribed: z.literal(false),
  }),
]);

type IsSubscribedResponse = z.infer<typeof IsSubscribedResponseSchema>;

export { IsSubscribedResponse, IsSubscribedResponseSchema };
