import { z } from "zod";

const CreateGuildQueryParamsSchema = z.object({
  guildId: z.string({
    invalid_type_error: "Guild id must be a string",
    required_error: "Guild id is required",
  }),
});

type CreateGuildQueryParams = z.infer<typeof CreateGuildQueryParamsSchema>;

export { CreateGuildQueryParams, CreateGuildQueryParamsSchema };
