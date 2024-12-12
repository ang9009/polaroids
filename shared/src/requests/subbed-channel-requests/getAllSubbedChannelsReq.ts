import { z } from "zod";

export const GetAllSubbedChannelsReqSchema = z.object({
  guildId: z.string(),
});

export type GetAllSubbedChannels = z.infer<typeof GetAllSubbedChannelsReqSchema>;
