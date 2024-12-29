import { z } from "zod";
export declare const FilterExistingFileIdsRequestSchema: z.ZodObject<{
    fileIds: z.ZodEffects<z.ZodString, string[], string>;
}, "strip", z.ZodTypeAny, {
    fileIds: string[];
}, {
    fileIds: string;
}>;
export type FilterExistingFileIdsRequest = z.infer<typeof FilterExistingFileIdsRequestSchema>;
