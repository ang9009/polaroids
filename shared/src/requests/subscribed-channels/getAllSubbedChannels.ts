import { z } from "zod";

export const GetSubbedChannelsRequestSchema = z.object({
  guildId: z.string(),
});

export type GetAllSubbedChannelsRequestBody = z.infer<typeof GetSubbedChannelsRequestSchema>;
