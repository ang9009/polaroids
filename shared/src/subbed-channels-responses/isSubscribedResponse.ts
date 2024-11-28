import { z } from "zod";

const IsSubscribedResponseSchema = z.object({
  isSubscribed: z.boolean({
    invalid_type_error: "isSubscribed must be a boolean",
    required_error: "isSubscribed is required",
  }),
  linkedAlbum: z.string().optional(),
});

type IsSubscribedResponse = z.infer<typeof IsSubscribedResponseSchema>;

export { IsSubscribedResponse, IsSubscribedResponseSchema };
