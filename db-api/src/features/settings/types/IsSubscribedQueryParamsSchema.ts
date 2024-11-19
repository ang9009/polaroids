import { z } from "zod";

const IsSubscribedQueryParamsSchema = z.object({
  channelId: z.string({
    invalid_type_error: "channelId must be a string",
    required_error: "channelId is required",
  }),
});

type IsSubscribedQueryParams = z.infer<typeof IsSubscribedQueryParamsSchema>;

export { IsSubscribedQueryParams, IsSubscribedQueryParamsSchema };
