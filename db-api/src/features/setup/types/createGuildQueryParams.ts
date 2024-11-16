import { z } from "zod";

const CreateGuildQueryParamsSchema = z.object({
  guildId: z.string({
    invalid_type_error: "guildId must be a string",
    required_error: "guildId is required",
  }),
  albumId: z.string({
    invalid_type_error: "albumId must be a string",
    required_error: "albumId is required",
  }),
});

type CreateGuildQueryParams = z.infer<typeof CreateGuildQueryParamsSchema>;

export { CreateGuildQueryParams, CreateGuildQueryParamsSchema };
