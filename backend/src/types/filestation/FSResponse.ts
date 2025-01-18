import { z } from "zod";

// The shape of the response from FileStation
export const FSResponseSchema = z.union([
  z.discriminatedUnion("success", [
    z.object({
      success: z.literal(true),
    }),
    z.object({
      success: z.literal(false),
      errno: z.object({
        key: z.string(),
      }),
    }),
  ]),
  z.instanceof(File),
]);

export type FSResponse = z.infer<typeof FSResponseSchema>;
