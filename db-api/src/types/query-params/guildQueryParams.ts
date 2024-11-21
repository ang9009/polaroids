import { z } from "zod";

const guildQueryParamsSchema = z.object({
  guildId: z.string({
    invalid_type_error: "guildId must be a string",
    required_error: "guildId is required",
  }),
});

type guildQueryParams = z.infer<typeof guildQueryParamsSchema>;

export { guildQueryParams, guildQueryParamsSchema };
