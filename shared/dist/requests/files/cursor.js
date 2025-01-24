import { z } from "zod";
export const GetFilesCursorSchema = z.object({
    discordId: z.string(),
    createdAt: z.coerce.string().datetime({ message: "String must be formatted in ISO8601" }),
});
//# sourceMappingURL=cursor.js.map