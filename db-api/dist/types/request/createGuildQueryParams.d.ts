import { z } from "zod";
declare const CreateGuildQueryParamsSchema: z.ZodObject<{
    guildId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    guildId: string;
}, {
    guildId: string;
}>;
type CreateGuildQueryParams = z.infer<typeof CreateGuildQueryParamsSchema>;
export { CreateGuildQueryParams, CreateGuildQueryParamsSchema };
