import { z } from "zod";
export declare const GetSubbedChannelsRequestSchema: z.ZodObject<{
    guildId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    guildId: string;
}, {
    guildId: string;
}>;
export type GetAllSubbedChannelsRequestBody = z.infer<typeof GetSubbedChannelsRequestSchema>;
