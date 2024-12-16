import { z } from "zod";

export const GetAllSubbedChannelsRequestSchema = z.object({
  guildId: z.string(),
});

export type GetAllSubbedChannelsRequest = z.infer<typeof GetAllSubbedChannelsRequestSchema>;
