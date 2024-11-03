import { z } from "zod";

const CreateGuildQueryParamsSchema = z.object({
  guildId: z.string(),
});

type CreateGuildQueryParams = z.infer<typeof CreateGuildQueryParamsSchema>;

export { CreateGuildQueryParams, CreateGuildQueryParamsSchema };
