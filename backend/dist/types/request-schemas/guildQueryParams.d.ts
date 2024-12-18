import { z } from "zod";
declare const GuildQueryParamsSchema: z.ZodObject<{
    guildId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    guildId: string;
}, {
    guildId: string;
}>;
type GuildQueryParams = z.infer<typeof GuildQueryParamsSchema>;
export { GuildQueryParams, GuildQueryParamsSchema };
